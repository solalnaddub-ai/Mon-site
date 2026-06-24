import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSound } from '@/hooks/useSound';

// Three.js stays out of the initial bundle until the hero mounts.
const HeroScene = lazy(() => import('@/three/HeroScene'));

export function Hero() {
  const reduced = useReducedMotion();
  const play = useSound((s) => s.play);
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  // Scroll parallax for the 3D layer (brief: "Parallax au scroll").
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '22%']);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-40%']);

  // GSAP staggered word reveal for the headline.
  useEffect(() => {
    if (reduced || !headline.current) return;
    const words = headline.current.querySelectorAll('[data-word]');
    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.2,
      });
    }, headline);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="top" className="relative min-h-dvh overflow-hidden scanlines">
      {/* 3D layer */}
      <motion.div
        style={{ y: sceneY, scale: sceneScale }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroScene reducedMotion={reduced} />
        </Suspense>
      </motion.div>

      {/* dark vignette so the headline stays legible over the 3D */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/30 via-transparent to-ink" />

      {/* copy */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-4 sm:px-6"
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-neon-cyan">
          Drop 001 — Édition Limitée
        </p>

        <h1 ref={headline} className="font-display text-[16vw] leading-[0.82] sm:text-[12vw] lg:text-[9rem]">
          <span className="block overflow-hidden">
            <span data-word className="inline-block">STAY</span>
          </span>
          <span className="block overflow-hidden">
            <span data-word className="inline-block text-stroke">FOCUS</span>
          </span>
        </h1>

        <p className="mt-6 max-w-md font-body text-base text-chalk-muted">
          Streetwear immersif. Pièces en série limitée, conçues pour ceux qui ne lâchent rien.
          Entre dans l'expérience.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <motion.a
            href="#shop"
            onClick={() => play('click')}
            onMouseEnter={() => play('hover')}
            className="btn-brutal bg-chalk text-ink hover:bg-neon-cyan"
            animate={reduced ? {} : { boxShadow: ['0 0 0px rgba(34,211,238,0)', '0 0 28px rgba(34,211,238,0.5)', '0 0 0px rgba(34,211,238,0)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            Explorer le Drop
          </motion.a>
          <a
            href="#about"
            onClick={() => play('click')}
            onMouseEnter={() => play('hover')}
            className="btn-brutal btn-brutal--neon"
          >
            Le manifeste
          </a>
        </div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 animate-bounce text-chalk-muted" aria-hidden="true" />
      </div>
    </section>
  );
}
