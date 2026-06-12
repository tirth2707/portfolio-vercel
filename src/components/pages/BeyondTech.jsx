import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  BriefcaseBusiness,
  Compass,
  Globe2,
  Handshake,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { beyondTechCta, entrepreneurshipFocus, interestTimeline } from '../../data/beyondTech';

const icons = [BriefcaseBusiness, Globe2, BrainCircuit, Compass];

const BeyondTech = () => (
  <main className="min-h-screen bg-slate-950 pt-28 text-white">
    <section className="relative overflow-hidden pb-24">
      <div className="absolute inset-0 surface-grid opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(52,211,153,0.14),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Beyond Tech
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-base">
              Engineer , Innovator , Entrepreneur
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Entrepreneurship, investing, and interests.
            </h1>
          </div>
          <p className="text-lg leading-8 text-slate-300">
            This page is for the part of my profile that does not fit neatly inside a tech stack:
            entrepreneurship, global investing, product judgment, company-building, and the kind of
            interests that shape how I think beyond code.
          </p>
        </div>
      </div>
    </section>

    <section className="border-y border-white/10 bg-[#07111f] py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {entrepreneurshipFocus.map((item, index) => {
          const Icon = icons[index] || Compass;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="border border-white/10 bg-slate-950/72 p-6"
            >
              <Icon className="h-7 w-7 text-cyan-300" />
              <h2 className="mt-6 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
            </motion.article>
          );
        })}
      </div>
    </section>

    <section className="border-y border-white/10 bg-[#07111f] py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.44fr_0.56fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="border border-emerald-300/20 bg-emerald-300/10 p-6"
        >
          <Handshake className="h-9 w-9 text-emerald-200" />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Connect & Build
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
            {beyondTechCta.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="border border-white/10 bg-slate-950/72 p-6"
        >
          <p className="text-base leading-8 text-slate-300">{beyondTechCta.copy}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {beyondTechCta.actions.map((action) => (
              <span
                key={action}
                className="border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-cyan-100"
              >
                {action}
              </span>
            ))}
          </div>
          <a
            href="mailto:tirthshah485@gmail.com"
            className="mt-8 inline-flex items-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Let&apos;s connect
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </a>
        </motion.div>
      </div>
    </section>

    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {interestTimeline.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default BeyondTech;
