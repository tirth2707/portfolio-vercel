import { Code2, Mail, Network, Send } from 'lucide-react';
import { profile } from '../../data/profile';

const iconByLabel = {
  GitHub: Code2,
  LinkedIn: Network,
  X: Send,
  Email: Mail,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-sm text-slate-300">© {currentYear} {profile.name}. All rights reserved.</p>
          <p className="mt-1 text-xs">Built with React, Tailwind CSS, Framer Motion, and Three.js.</p>
        </div>
        <div className="flex items-center gap-2">
          {profile.socials.map((social) => {
            const Icon = iconByLabel[social.label] || Mail;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-200"
                aria-label={social.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
