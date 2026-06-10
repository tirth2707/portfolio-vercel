import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cloud,
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Network,
  ShieldAlert,
} from 'lucide-react';
import { architectureFlow } from '../../data/architectureFlow';
import { useAudienceMode } from '../../hooks/useAudienceMode';
import SectionHeader from '../ui/SectionHeader';

const icons = {
  frontend: Code2,
  api: Network,
  auth: KeyRound,
  database: Database,
  'cloud-runtime': Cloud,
  cicd: GitBranch,
};

const ArchitectureSimulator = () => {
  const [activeId, setActiveId] = useState(architectureFlow[0].id);
  const { mode } = useAudienceMode();
  const active = architectureFlow.find((item) => item.id === activeId) || architectureFlow[0];
  const ActiveIcon = icons[active.id] || Code2;

  return (
    <section id="simulator" className="bg-[#07111f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Interactive Architecture Simulator"
          title="Click through how I design a production system."
          copy="This flow turns the portfolio into a practical design walkthrough: frontend, API, auth, database, cloud runtime, and delivery pipeline."
        />

        <div className="mt-12 border border-white/10 bg-slate-950/72 p-5 shadow-2xl shadow-black/20">
          <div className="grid gap-3 lg:grid-cols-6">
            {architectureFlow.map((node, index) => {
              const Icon = icons[node.id] || Code2;
              const selected = activeId === node.id;

              return (
                <div key={node.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={`min-h-36 w-full border p-4 text-left transition ${
                      selected
                        ? 'border-cyan-300/60 bg-cyan-300/10 shadow-lg shadow-cyan-950/40'
                        : 'border-white/10 bg-white/[0.035] hover:border-white/25'
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center border ${
                          selected
                            ? 'border-cyan-300/50 bg-cyan-300/15 text-cyan-100'
                            : 'border-white/10 text-slate-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-slate-500">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">{node.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{node.short}</p>
                  </button>
                  {index < architectureFlow.length - 1 && (
                    <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-cyan-300/50 lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          <motion.div
            key={`${active.id}-${mode}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-5 lg:grid-cols-[0.36fr_0.64fr]"
          >
            <div className="relative overflow-hidden border border-cyan-300/20 bg-cyan-300/10 p-6">
              <div className="absolute inset-0 surface-grid opacity-30" />
              <div className="relative">
                <ActiveIcon className="h-9 w-9 text-cyan-200" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Selected layer
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{active.label}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {mode === 'recruiter' ? active.recruiterValue : active.engineerDetail}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Decisions
                </p>
                <div className="mt-4 space-y-2">
                  {active.decisions.map((decision) => (
                    <p key={decision} className="text-sm leading-6 text-slate-300">
                      {decision}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Tooling
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tools.map((tool) => (
                    <span key={tool} className="border border-white/10 px-2.5 py-1 text-xs text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-rose-300/20 bg-rose-300/10 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-100">
                  <ShieldAlert className="h-4 w-4" />
                  Risk I watch
                </div>
                <p className="mt-4 text-sm leading-6 text-rose-50/90">{active.risk}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSimulator;
