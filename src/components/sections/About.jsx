import { motion } from 'framer-motion';
import { Cpu, Layers3, Route, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import SectionHeader from '../ui/SectionHeader';

const principles = [
  {
    icon: Layers3,
    title: 'Modernize with context',
    copy: 'Architecture choices are tied to delivery risk, team ownership, security, and long-term maintainability.',
  },
  {
    icon: Cpu,
    title: 'Build product-grade systems',
    copy: 'Frontend, backend, data, and cloud layers are designed together so user experience and operations stay aligned.',
  },
  {
    icon: Route,
    title: 'Turn complexity into workflow',
    copy: 'Migration, testing, and CI/CD work becomes repeatable engineering systems instead of one-off heroics.',
  },
  {
    icon: Sparkles,
    title: 'Use AI practically',
    copy: 'AI is treated as a way to accelerate reasoning, documentation, validation, and user-facing intelligence.',
  },
];

const About = () => (
  <section id="about" className="bg-[#07111f] py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
        <SectionHeader
          align="left"
          eyebrow="About"
          title="I connect cloud architecture with product execution."
          copy={profile.positioning}
        />

        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg leading-8 text-slate-300"
          >
            I work best where product requirements, platform constraints, and engineering quality
            all meet. My role is to make that complexity usable: translate architecture into
            shippable increments, turn migrations into controlled workflows, and make standards
            practical enough for a team to follow.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-lg leading-8 text-slate-300"
          >
            At Searce, that has meant enterprise MEAN/MERN application work, GCP-oriented
            modernization, PostgreSQL migration accelerators, testing and linting standards,
            SonarQube hygiene, and mentoring loops that improve delivery speed without lowering
            technical discipline.
          </motion.p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {[
          ['Architecture lens', 'I look for the system boundary, ownership model, operational risk, and migration path before adding abstractions.'],
          ['Delivery lens', 'I break work into slices that prove frontend, API, data, cloud, and quality assumptions together.'],
          ['AI lens', 'I use AI tooling where it improves reasoning, documentation, validation, and developer throughput.'],
        ].map(([title, copy]) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="border border-white/10 bg-slate-950/72 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {title}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle, index) => {
          const Icon = principle.icon;

          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border border-white/10 bg-slate-950/70 p-5"
            >
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-5 text-lg font-semibold text-white">{principle.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{principle.copy}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default About;
