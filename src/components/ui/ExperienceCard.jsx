import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-gradient-to-b from-primary-500 to-purple-500"
    >
      <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full shadow-lg border-2 border-white dark:border-gray-800"></div>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>
        <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {experience.role}
            </h3>
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
              {experience.company}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-2 md:mt-0 md:text-right">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span>{experience.period}</span>
            </div>
          </div>
        </div>
        <ul className="space-y-2 mb-4">
          {experience.description.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-600 dark:text-gray-300 flex items-start"
            >
              <span className="mr-2 text-primary-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-800 dark:text-primary-200 rounded-lg border border-primary-200 dark:border-primary-800"
            >
              {tech}
            </span>
          ))}
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
