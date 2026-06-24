import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';

const STATS = [
  { value: '001', label: 'Drops sortis' },
  { value: '12K', label: 'Communauté' },
  { value: '100%', label: 'Série limitée' },
  { value: '24/7', label: 'Focus' },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-y-2 border-ink-700 bg-ink-950 py-24">
      {/* faint scrolling backdrop word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-[0.04]"
      >
        <span className="animate-marquee whitespace-nowrap font-display text-[20vw] uppercase leading-none">
          STAYFOCUS · STAYFOCUS · STAYFOCUS ·
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading index="03 — MANIFESTE" kicker="À propos" title="Reste concentré" />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 font-body text-lg text-chalk-muted"
          >
            <p>
              <span className="text-chalk">STAYFOCUS</span> est né dans la rue, entre le bruit et le
              mouvement. On crée des pièces pour celles et ceux qui gardent le cap quand tout pousse
              à dévier.
            </p>
            <p>
              Chaque drop est une déclaration : matières lourdes, coupes franches, zéro compromis.
              Produit en série limitée — quand c'est parti, c'est parti.
            </p>
            <p className="font-mono text-sm uppercase tracking-widest text-neon-cyan">
              No noise. Just focus.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-px border-2 border-ink-700 bg-ink-700">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center justify-center gap-2 bg-ink-900 p-8"
              >
                <span className="font-display text-5xl text-glow-cyan">{s.value}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-chalk-dim">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
