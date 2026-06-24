import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/cn';

/**
 * Global SFX mute toggle (brief: "Permettre à l'utilisateur de désactiver les
 * sons"). Animated equalizer bars indicate the on state.
 */
export function SoundToggle({ className }: { className?: string }) {
  const enabled = useSound((s) => s.enabled);
  const toggle = useSound((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Couper le son' : 'Activer le son'}
      title={enabled ? 'Son activé' : 'Son coupé'}
      className={cn(
        'grid h-11 w-11 place-items-center border-2 border-ink-600 text-chalk-muted transition-colors duration-150',
        'hover:border-neon-cyan hover:text-neon-cyan',
        enabled && 'border-neon-cyan text-neon-cyan shadow-glow-cyan',
        className,
      )}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
