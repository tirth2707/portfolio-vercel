import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

const ImpactStrip = () => (
  <section id="impact" className="border-y border-white/10 bg-slate-950/95 py-8">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
      {profile.metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="group relative min-h-36 overflow-hidden border border-white/10 bg-white/[0.035] p-5 backdrop-blur transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-emerald-300 to-rose-300 opacity-70" />
          <div className="text-3xl font-semibold text-white">{metric.value}</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{metric.label}</p>
          <div className="mt-5 h-1.5 overflow-hidden bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${68 + index * 6}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="h-full bg-cyan-300"
            />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ImpactStrip;
