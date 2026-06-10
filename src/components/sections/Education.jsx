import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const education = [
  {
    degree: 'BTech in Computer Science',
    institution: 'Nirma University',
    period: '2019 - 2022',
    description:
      'Focused on software engineering, algorithms, data structures, and the foundations behind scalable product systems.',
  },
];

const Education = () => (
  <section id="education" className="bg-slate-950 py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Foundation"
        title="Computer science fundamentals underneath the cloud layer."
        copy="Formal engineering foundations paired with production experience across web, data, and cloud systems."
      />

      <div className="mx-auto mt-12 max-w-4xl">
        {education.map((item, index) => (
          <motion.article
            key={item.degree}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="border border-white/10 bg-white/[0.035] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{item.degree}</h3>
                    <p className="mt-2 text-base font-medium text-emerald-300">
                      {item.institution}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <BookOpen className="h-4 w-4" />
                    {item.period}
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
