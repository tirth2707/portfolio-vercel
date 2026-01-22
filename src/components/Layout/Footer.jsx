import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/tirth2707', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/tirth2707', label: 'LinkedIn' },
    { icon: FiLinkedin, href: 'https://x.com/tirth2707', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:tirthshah485@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {currentYear} Tirth Shah. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Built with React, Tailwind CSS, and Framer Motion
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
