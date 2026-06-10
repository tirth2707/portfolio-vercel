import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { blogs } from '../../data/blogs';

import 'github-markdown-css/github-markdown-dark.css';
import 'highlight.js/styles/github-dark.css';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === Number.parseInt(id, 10));

  if (!blog) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 py-32 text-center text-white">
        <h1 className="text-4xl font-semibold">Blog not found</h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 py-28 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 border-b border-white/10 pb-8"
        >
          {blog.category && (
            <span className="inline-block bg-cyan-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
              {blog.category}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {blog.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {blog.readingTime || 5} min read
            </span>
            {blog.tags?.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 border border-white/10 px-3 py-1">
                <Tag className="h-3.5 w-3.5" />
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <div className="markdown-body github-markdown-dark border border-white/10 bg-[#0d1117] p-6 sm:p-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogDetail;
