import { useEffect } from 'react';
import { IntroLoader } from '@/components/IntroLoader';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Hero } from '@/sections/Hero';
import { Featured } from '@/sections/Featured';
import { Shop } from '@/sections/Shop';
import { About } from '@/sections/About';
import { Newsletter } from '@/sections/Newsletter';
import { Footer } from '@/sections/Footer';
import { useSound } from '@/hooks/useSound';

export default function App() {
  const hydrate = useSound((s) => s.hydrate);

  // Restore the user's saved sound preference once on mount.
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <IntroLoader />

      {/* skip link — keyboard accessibility (Quick Ref §1) */}
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border-2 focus:border-neon-cyan focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-neon-cyan"
      >
        Aller au contenu
      </a>

      <Navbar />
      <CartDrawer />

      <main>
        <Hero />
        <Featured />
        <Shop />
        <About />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
