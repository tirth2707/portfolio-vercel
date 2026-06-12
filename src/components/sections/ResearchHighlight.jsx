import { motion } from 'framer-motion';
import { BookOpenText, ExternalLink, Microscope, ShieldCheck } from 'lucide-react';
import { researchPublication } from '../../data/research';
import SectionHeader from '../ui/SectionHeader';

const ResearchHighlight = () => (
  <section id="research" className="bg-slate-950 py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Research"
        title="Academic depth behind the builder profile."
        copy="Alongside product engineering and cloud architecture, this highlights published research work and technical communication beyond day-to-day implementation."
      />

      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mt-12 grid gap-5 border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 lg:grid-cols-[0.38fr_0.62fr]"
      >
        <div className="relative overflow-hidden border border-cyan-300/20 bg-cyan-300/10 p-6">
          <div className="absolute inset-0 surface-grid opacity-30" />
          <div className="relative">
            <Microscope className="h-10 w-10 text-cyan-200" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {researchPublication.venue}
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{researchPublication.status}</h3>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="border border-white/10 bg-slate-950/50 p-3">
                <span className="block text-slate-500">PMID</span>
                <span className="mt-1 block font-semibold text-cyan-100">{researchPublication.pmid}</span>
              </div>
              <div className="border border-white/10 bg-slate-950/50 p-3">
                <span className="block text-slate-500">DOI</span>
                <span className="mt-1 block break-all font-semibold text-cyan-100">
                  {researchPublication.doi}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{researchPublication.summary}</p>
          </div>
        </div>

        <div className="p-2 sm:p-4">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Publication
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{researchPublication.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {researchPublication.authors.join(', ')}
              </p>
              <p className="mt-3 text-sm text-cyan-200">
                {researchPublication.journal}, Volume {researchPublication.volume}, pages{' '}
                {researchPublication.pages} ({researchPublication.year})
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={researchPublication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
              >
                PubMed
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={researchPublication.doiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-100"
              >
                DOI
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {researchPublication.signals.map((signal) => (
              <div key={signal} className="flex gap-3 border border-white/10 bg-slate-950/70 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span className="text-sm leading-6 text-slate-300">{signal}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 border border-white/10 bg-slate-950/70 p-4">
            <BookOpenText className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
            <p className="text-sm leading-7 text-slate-300">
              This section is intentionally separated from certifications: it shows research,
              written communication, and intellectual range, not only platform credentials.
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  </section>
);

export default ResearchHighlight;
