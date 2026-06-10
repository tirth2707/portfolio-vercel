import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, MessageSquareText, Sparkles } from 'lucide-react';
import { assistantPrompts } from '../../data/assistantPrompts';
import { useAudienceMode } from '../../hooks/useAudienceMode';
import SectionHeader from '../ui/SectionHeader';

const PortfolioAssistant = () => {
  const [activeId, setActiveId] = useState(assistantPrompts[0].id);
  const { mode } = useAudienceMode();
  const activePrompt = useMemo(
    () => assistantPrompts.find((prompt) => prompt.id === activeId) || assistantPrompts[0],
    [activeId],
  );

  return (
    <section id="assistant" className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_20%_82%,rgba(52,211,153,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Portfolio Assistant"
          title="Ask the portfolio the questions recruiters and engineers actually ask."
          copy="This v1 assistant is simulated, fast, and grounded in the portfolio content. A real AI backend can be added later without changing the experience."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Bot className="h-6 w-6 text-cyan-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Prompt deck</p>
                <h3 className="text-lg font-semibold text-white">Choose a question</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {assistantPrompts.map((prompt) => {
                const active = prompt.id === activeId;
                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => setActiveId(prompt.id)}
                    className={`w-full border p-4 text-left text-sm font-medium transition ${
                      active
                        ? 'border-cyan-300/60 bg-cyan-300/10 text-white'
                        : 'border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/25'
                    }`}
                    aria-pressed={active}
                  >
                    {prompt.question}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={`${activePrompt.id}-${mode}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="border border-cyan-300/20 bg-[#06131f]/90 p-6 shadow-2xl shadow-cyan-950/20"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                  <MessageSquareText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Simulated assistant response
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{activePrompt.question}</h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Sparkles className="h-4 w-4" />
                {mode} mode
              </div>
            </div>

            <p className="mt-6 text-lg leading-8 text-slate-200">{activePrompt.answer}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Evidence
                </p>
                <div className="mt-4 space-y-3">
                  {activePrompt.evidence.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Best next section
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {mode === 'recruiter'
                    ? 'Review impact metrics, case studies, credentials, then contact.'
                    : 'Inspect the architecture simulator, systems model, skills lab, and case-study decision blocks.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAssistant;
