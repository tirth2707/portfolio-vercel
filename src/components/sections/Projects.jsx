import { motion } from 'framer-motion';
import { Bot, CloudCog, DatabaseZap, ShieldCheck, Target, Wrench, Trophy } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import SectionHeader from '../ui/SectionHeader';

const visualIconByType = {
  'cloud-topology': CloudCog,
  'migration-timeline': DatabaseZap,
  'quality-pipeline': ShieldCheck,
  'ai-signal': Bot,
};

const narrativeItems = [
  { key: 'challenge', label: 'Challenge', icon: Target },
  { key: 'approach', label: 'Approach', icon: Wrench },
  { key: 'outcome', label: 'Outcome', icon: Trophy },
];

const Projects = () => (
  <section id="projects" className="bg-[#07111f] py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Case Studies"
        title="Proof-of-work case studies with the engineering context included."
        copy="Each case study explains the problem shape, the technical response, and the measurable result so the portfolio feels closer to a senior engineering review than a gallery."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {caseStudies.map((study, index) => {
          const Icon = visualIconByType[study.visualType] || CloudCog;

          return (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group overflow-hidden border border-white/10 bg-slate-950/72 shadow-2xl shadow-black/20"
            >
              <div className="grid min-h-full gap-0 xl:grid-cols-[0.38fr_0.62fr]">
                <div className="relative min-h-72 overflow-hidden border-b border-white/10 bg-slate-900 p-6 xl:border-b-0 xl:border-r">
                  <div className="absolute inset-0 surface-grid opacity-70" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.28),transparent_26%),radial-gradient(circle_at_72%_72%,rgba(52,211,153,0.2),transparent_32%)]" />
                  <div className="relative flex h-full min-h-52 flex-col justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-3">
                      {study.metrics.map((metric) => (
                        <div key={metric} className="border border-white/10 bg-white/[0.04] p-3">
                          <span className="text-sm font-medium text-slate-100">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                    {study.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{study.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{study.summary}</p>

                  <div className="mt-6 space-y-3">
                    {narrativeItems.map((item) => {
                      const NarrativeIcon = item.icon;
                      return (
                        <div key={item.key} className="border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                            <NarrativeIcon className="h-4 w-4" />
                            {item.label}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{study[item.key]}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {study.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects;
