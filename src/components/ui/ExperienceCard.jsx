import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-primary-500 dark:border-primary-400"
    >
      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
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
              className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
