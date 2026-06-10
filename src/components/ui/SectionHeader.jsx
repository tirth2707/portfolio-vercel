import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, copy, align = 'center' }) => {
  const isLeft = align === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`${isLeft ? 'text-left' : 'text-center mx-auto'} max-w-3xl`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{copy}</p>}
    </motion.div>
  );
};

export default SectionHeader;
