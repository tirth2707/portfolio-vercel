import { motion } from 'framer-motion';
import { Calendar, CircleDot, Workflow } from 'lucide-react';
import { experience } from '../../data/experience';
import SectionHeader from '../ui/SectionHeader';

const Experience = () => (
  <section id="experience" className="bg-slate-950 py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Experience"
        title="A timeline built around engineering leverage."
        copy="The work is not just implementation: it is architecture, migration strategy, code quality, mentorship, and delivery systems."
      />

      <div className="relative mx-auto mt-14 max-w-5xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300 via-emerald-300 to-rose-300 md:block" />
        <div className="space-y-6">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative border border-white/10 bg-white/[0.035] p-6 md:ml-12 md:p-8"
            >
              <div className="absolute -left-[3.24rem] top-8 hidden h-8 w-8 items-center justify-center border border-cyan-300/40 bg-slate-950 text-cyan-300 md:flex">
                <CircleDot className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {item.company}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.role}</h3>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  {item.period}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
                <ul className="space-y-3">
                  {item.description.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-slate-300">
                      <Workflow className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stack signal</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
