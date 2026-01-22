import { motion } from 'framer-motion';
import { FiBook, FiCalendar } from 'react-icons/fi';

const Education = () => {
  const education = [
    {
      degree: 'BTech in Computer Science',
      institution: 'Nirma University',
      period: '2019-2022',
      description: 'Graduated with honors. Focused on software engineering, algorithms, and data structures.',
    },
  ];

  return (
    <section
      id="education"
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <FiBook className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <FiCalendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
