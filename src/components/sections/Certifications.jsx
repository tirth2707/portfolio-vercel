import { motion } from "framer-motion";
import { certifications } from "../../data/certifications";
const Certifications = () => {
  return (
    <section id="certifications" className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
        </motion.div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 lg:grid-cols-3 gap-5">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Issuer: {cert.issuer}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Date: {cert.date}
              </p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                View Certificate
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
