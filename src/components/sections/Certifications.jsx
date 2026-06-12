import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';
import SectionHeader from '../ui/SectionHeader';

const Certifications = () => (
  <section id="certifications" className="bg-[#07111f] py-24 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Credentials"
        title="Google Cloud credentials that back the architecture story."
        copy="Cloud architecture, professional cloud development, associate engineering, and Gen-AI certification work connect the portfolio visuals to real proof."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {certifications.map((cert, index) => (
          <motion.article
            key={cert.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="border border-white/10 bg-slate-950/72 p-6"
          >
            <BadgeCheck className="h-8 w-8 text-emerald-300" />
            <h3 className="mt-6 text-xl font-semibold text-white">{cert.title}</h3>
            <p className="mt-3 text-sm text-slate-400">{cert.issuer}</p>
            <p className="mt-1 text-sm text-cyan-200">{cert.date}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
            >
              View credential
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
