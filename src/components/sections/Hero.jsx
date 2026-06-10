import { Suspense, lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, BrainCircuit, CheckCircle2, Download, Mail, Radar, ServerCog } from 'lucide-react';
import { profile } from '../../data/profile';

const CloudLabScene = lazy(() => import('../three/CloudLabScene'));

const Hero = () => {
  const reduceMotion = useReducedMotion();

  const scrollTo = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0">
        {reduceMotion ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.25),transparent_34%),linear-gradient(135deg,#050816,#111827_48%,#020617)]" />
        ) : (
          <Suspense
            fallback={
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),#050816_66%)]" />
            }
          >
            <CloudLabScene />
          </Suspense>
        )}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(2,6,23,0.72)_45%,rgba(2,6,23,0.34)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <Radar className="h-4 w-4" />
              AI Cloud Lab online
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-medium text-slate-100 sm:text-2xl">
              {profile.role}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-4 max-w-2xl border-l border-cyan-300/40 pl-4 text-sm leading-7 text-slate-400">
              {profile.heroStatement}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center justify-center gap-2 bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <Mail className="h-4 w-4" />
                Start a conversation
              </button>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-emerald-300/50 hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
              <button
                type="button"
                onClick={() => scrollTo('#skills')}
                className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-rose-300/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <BrainCircuit className="h-4 w-4" />
                Explore skills
              </button>
            </div>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
              {profile.proofPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22 + index * 0.05 }}
                  className="flex gap-3 border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300 backdrop-blur"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative mx-auto w-full max-w-md lg:mr-0"
          >
            <div className="absolute -inset-4 border border-cyan-300/20" />
            <div className="relative border border-white/12 bg-slate-950/72 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>Command profile</span>
                <span className="text-emerald-300">Verified</span>
              </div>
              <div className="mt-4 overflow-hidden border border-white/10 bg-slate-900">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  className="aspect-[4/4.6] w-full object-cover grayscale-[15%] saturate-110"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {profile.commandStats.map((stat) => (
                  <div key={stat.label} className="border border-white/10 bg-white/[0.04] p-3">
                    <span className="block text-slate-400">{stat.label}</span>
                    <span className="mt-1 block font-semibold text-cyan-200">{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border border-emerald-300/20 bg-emerald-300/10 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  <ServerCog className="h-4 w-4" />
                  Operating profile
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Product UI, service contracts, cloud runtime, database movement, and quality
                  loops designed as one delivery system.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#impact')}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 text-slate-400 transition hover:text-cyan-200 md:block"
        aria-label="Scroll to impact"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;
