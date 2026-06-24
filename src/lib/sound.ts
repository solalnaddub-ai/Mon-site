/**
 * STAYFOCUS — UI Sound FX engine.
 *
 * The brief asks for subtle, non-intrusive synthetic UI sounds (hover beep,
 * click, add-to-cart chime, transition whoosh, error) with a global mute
 * toggle. We synthesize everything with the Web Audio API so there are no
 * audio asset files to ship or lazy-load, and volume stays normalized.
 *
 * Sounds are OFF by default (autoplay/UX courtesy) and only initialize the
 * AudioContext after the first user gesture, per browser autoplay policy.
 */

export type Sfx = 'hover' | 'click' | 'addToCart' | 'transition' | 'error' | 'intro';

const STORAGE_KEY = 'stayfocus:sound';

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let enabled = false;
let lastHover = 0;

function readStored(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'on';
}

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.18; // normalized, subtle
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** A single shaped oscillator voice with an ADSR-ish gain envelope. */
function voice(
  freq: number,
  opts: {
    type?: OscillatorType;
    duration?: number;
    gain?: number;
    glideTo?: number;
    delay?: number;
  } = {},
): void {
  if (!ctx || !masterGain) return;
  const { type = 'sine', duration = 0.12, gain = 0.6, glideTo, delay = 0 } = opts;
  const t0 = ctx.currentTime + delay;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);

  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(g);
  g.connect(masterGain);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

const recipes: Record<Sfx, () => void> = {
  // Hover: soft high beep (100-200ms)
  hover: () => voice(880, { type: 'triangle', duration: 0.08, gain: 0.25 }),
  // Click: sharp short pop (50-100ms)
  click: () => voice(420, { type: 'square', duration: 0.06, gain: 0.4, glideTo: 180 }),
  // Add to cart: ascending success chime (300-500ms)
  addToCart: () => {
    voice(523.25, { type: 'sine', duration: 0.12, gain: 0.5 });
    voice(659.25, { type: 'sine', duration: 0.12, gain: 0.5, delay: 0.09 });
    voice(987.77, { type: 'sine', duration: 0.22, gain: 0.5, delay: 0.18 });
  },
  // Page transition: smooth downward whoosh
  transition: () => voice(660, { type: 'sawtooth', duration: 0.42, gain: 0.22, glideTo: 120 }),
  // Error: discreet low alert beep
  error: () => {
    voice(220, { type: 'square', duration: 0.12, gain: 0.4 });
    voice(180, { type: 'square', duration: 0.16, gain: 0.4, delay: 0.13 });
  },
  // Intro: rising glow sweep for the logo loader
  intro: () => voice(160, { type: 'sawtooth', duration: 0.9, gain: 0.3, glideTo: 720 }),
};

export const sound = {
  isEnabled(): boolean {
    return enabled;
  },
  /** Hydrate from storage; called once on mount. */
  init(): boolean {
    enabled = readStored();
    return enabled;
  },
  setEnabled(value: boolean): void {
    enabled = value;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off');
    }
    if (value) ensureContext();
  },
  toggle(): boolean {
    this.setEnabled(!enabled);
    if (enabled) this.play('click');
    return enabled;
  },
  play(name: Sfx): void {
    if (!enabled) return;
    if (!ensureContext()) return;
    // Throttle hover spam so rapid pointer movement doesn't machine-gun beeps.
    if (name === 'hover') {
      const now = performance.now();
      if (now - lastHover < 90) return;
      lastHover = now;
    }
    recipes[name]?.();
  },
};
