import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useSound } from '@/hooks/useSound';

const COLUMNS = [
  { title: 'Shop', links: ['Nouveautés', 'Drops', 'Hauts', 'Outerwear', 'Accessoires'] },
  { title: 'Aide', links: ['Livraison', 'Retours', 'Guide des tailles', 'FAQ', 'Contact'] },
  { title: 'Marque', links: ['Manifeste', 'Durabilité', 'Carrières', 'Presse'] },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter / X' },
  { icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  const play = useSound((s) => s.play);

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="border-t-2 border-ink-700 bg-ink-950"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-body text-sm text-chalk-muted">
              Streetwear immersif en série limitée. Conçu pour rester concentré.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                  className="grid h-11 w-11 place-items-center border-2 border-ink-600 text-chalk-muted transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-chalk-dim">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onMouseEnter={() => play('hover')}
                      className="font-body text-sm text-chalk-muted transition-colors hover:text-chalk"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-700 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-chalk-dim">
            © {new Date().getFullYear()} STAYFOCUS. Tous droits réservés.
          </p>
          <div className="flex gap-6 font-mono text-xs text-chalk-dim">
            <a href="#" className="hover:text-chalk">Mentions légales</a>
            <a href="#" className="hover:text-chalk">Confidentialité</a>
            <a href="#" className="hover:text-chalk">CGV</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
