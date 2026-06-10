import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Contact, Download, Layers3 } from 'lucide-react';
import { audienceViews } from '../../data/audienceViews';
import { profile } from '../../data/profile';
import { useAudienceMode } from '../../hooks/useAudienceMode';

const AudiencePanel = () => {
  const { mode } = useAudienceMode();
  const view = audienceViews[mode];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mode-view" className="border-y border-white/10 bg-[#06111f] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-5 lg:grid-cols-[0.4fr_0.6fr]"
        >
          <div className="border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {view.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">{view.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{view.copy}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
              >
                <Contact className="h-4 w-4" />
                Contact
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Primary signals</h3>
              </div>
              <div className="mt-5 space-y-3">
                {view.primary.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <h3 className="text-lg font-semibold text-white">Proof to inspect</h3>
              </div>
              <div className="mt-5 space-y-3">
                {view.proof.map((item) => (
                  <div key={item} className="text-sm leading-6 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-cyan-100">
                {view.cta}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AudiencePanel;
