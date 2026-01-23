import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
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
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 mx-auto mb-4 rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img src="../../assets/tirth.png" alt="Tirth Shah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I am a result-driven Software Engineer with over 3 years of experience in full-stack development and cloud-native solutions. My passion lies in bridging the gap between complex infrastructure and seamless user experiences.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Currently serving as a Senior Software Engineer at Searce, I specialize in architecting MEAN/MERN stack applications and navigating complex cloud migrations on Google Cloud Platform (GCP). Beyond the code, I am a Google Certified Cloud Architect committed to engineering excellence—mentoring junior developers, authoring best practices for unit testing and linting, and optimizing delivery speeds for cross-functional teams.
              </p>
              {/* <p className="text-lg text-gray-600 dark:text-gray-300">
                When I'm not coding, I enjoy contributing to open-source projects, writing
                technical blog posts, and participating in tech communities.
              </p> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
