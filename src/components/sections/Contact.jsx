import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ShieldCheck } from 'lucide-react';
import { profile } from '../../data/profile';
import SectionHeader from '../ui/SectionHeader';

const initialFormData = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Portfolio contact request',
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFeedback('Message sent. I will get back to you soon.');
      setFormData(initialFormData);
    } catch {
      setStatus('error');
      setFeedback(`Could not send from the form. Email me directly at ${profile.email}.`);
    }
  };

  return (
    <section id="contact" className="bg-[#07111f] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Bring a modernization, cloud, or AI product problem."
          copy="The shortest path is a clear message with the system, goal, and constraint. I will meet it with engineering context."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[0.38fr_0.62fr]">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="border border-white/10 bg-slate-950/72 p-6"
          >
            <ShieldCheck className="h-8 w-8 text-emerald-300" />
            <h3 className="mt-6 text-xl font-semibold text-white">Signal over noise</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              I am open to engineering roles, architecture conversations, modernization work, and
              AI-enabled product systems.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            onSubmit={handleSubmit}
            className="border border-white/10 bg-slate-950/72 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-300">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="mt-2 w-full resize-none border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                placeholder="Tell me about the system, constraint, or opportunity."
              />
            </label>

            {feedback && (
              <div
                className={`mt-5 border px-4 py-3 text-sm ${
                  status === 'success'
                    ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
                    : 'border-rose-300/30 bg-rose-300/10 text-rose-100'
                }`}
                role="status"
              >
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === 'submitting' ? 'Sending message...' : 'Send message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
