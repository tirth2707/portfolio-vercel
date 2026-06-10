import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, Cloud, Code2, Database, ShieldCheck, Workflow } from 'lucide-react';
import { intelligenceLoop, operatingLayers } from '../../data/operatingModel';
import SectionHeader from '../ui/SectionHeader';

const layerIcons = [Code2, Workflow, Cloud, Database, ShieldCheck];

const ArchitectureLab = () => (
  <section id="systems" className="relative overflow-hidden bg-slate-950 py-24 text-white">
    <div className="absolute inset-0 surface-grid opacity-30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(52,211,153,0.14),transparent_32%)]" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Systems Architecture"
        title="A portfolio that shows how I think through real delivery systems."
        copy="The strongest work happens between layers. This model shows how I connect UI, services, cloud runtime, data movement, quality, and AI-assisted execution."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="border border-white/10 bg-slate-950/78 p-5 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
                Modernization Stack
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Five connected layers</h3>
            </div>
            <div className="hidden border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 sm:block">
              Production minded
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {operatingLayers.map((layer, index) => {
              const Icon = layerIcons[index] || Workflow;

              return (
                <motion.article
                  key={layer.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                  className="grid gap-4 border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[3rem_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {layer.label}
                      </p>
                      <span className="text-xs text-emerald-200">{layer.signal}</span>
                    </div>
                    <h4 className="mt-2 text-lg font-semibold text-white">{layer.headline}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{layer.detail}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="border border-white/10 bg-[#06131f]/90 p-5 shadow-2xl shadow-cyan-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">AI-assisted loop</p>
                <h3 className="mt-1 text-xl font-semibold text-white">How intelligence enters the work</h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {intelligenceLoop.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                  className="flex gap-3 border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-emerald-300/25 text-xs font-semibold text-emerald-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-slate-950/78 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              What this means in practice
            </p>
            <div className="mt-5 space-y-4">
              {[
                'System boundaries are explicit before implementation begins.',
                'Migration plans include validation, rollback, and operational handoff.',
                'Quality gates are designed for team adoption, not performative checklists.',
                'AI tooling supports reasoning and documentation while humans own judgment.',
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ArchitectureLab;
