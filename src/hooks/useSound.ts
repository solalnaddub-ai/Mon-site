import { create } from 'zustand';
import { sound, type Sfx } from '@/lib/sound';

type SoundState = {
  enabled: boolean;
  hydrate: () => void;
  toggle: () => void;
  play: (name: Sfx) => void;
};

/**
 * Thin reactive wrapper over the imperative `sound` engine so UI (the mute
 * toggle, etc.) re-renders, while playback stays cheap and side-effect free.
 */
export const useSound = create<SoundState>((set) => ({
  enabled: false,
  hydrate: () => set({ enabled: sound.init() }),
  toggle: () => set({ enabled: sound.toggle() }),
  play: (name) => sound.play(name),
}));

/** Convenience: returns a memo-stable play fn for event handlers. */
export function usePlaySfx() {
  return useSound((s) => s.play);
}
