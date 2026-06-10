import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Tag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { blogs } from '../../data/blogs';
import SectionHeader from '../ui/SectionHeader';

const getCleanText = (markdown) => {
  if (!markdown) return '';
  return markdown
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/>\s+/g, '')
    .replace(/-|\*|\d+\./g, '')
    .replace(/\n+/g, ' ')
    .trim();
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';

  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach((blog) => blog.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) => {
        const haystack = `${blog.title} ${blog.excerpt || ''} ${getCleanText(blog.content)}`;
        const matchesSearch =
          searchQuery === '' || haystack.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
      }),
    [searchQuery, selectedTag],
  );

  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];
  const regularBlogs = filteredBlogs.filter((blog) => !isBlogPage || blog.id !== featuredBlog?.id);

  return (
    <section
      id="blog"
      className={`${isBlogPage ? 'min-h-screen pt-28' : ''} bg-slate-950 py-24 text-white`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title={isBlogPage ? 'Engineering notes and field signals.' : 'Recent thinking from the lab.'}
          copy="AI, software engineering, architecture, product systems, and the practical tradeoffs behind modern tools."
        />

        {isBlogPage && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-10 max-w-4xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full border border-white/10 bg-white/[0.04] py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
              />
            </div>

            {allTags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium transition ${
                    selectedTag === null
                      ? 'bg-cyan-300 text-slate-950'
                      : 'border border-white/10 text-slate-300 hover:border-cyan-300/50'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    type="button"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                      selectedTag === tag
                        ? 'bg-cyan-300 text-slate-950'
                        : 'border border-white/10 text-slate-300 hover:border-cyan-300/50'
                    }`}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {isBlogPage && featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-12 max-w-5xl"
          >
            <Link to={`/blog/${featuredBlog.id}`} className="block border border-cyan-300/30 bg-cyan-300/10 p-6 transition hover:bg-cyan-300/[0.14] sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-cyan-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
                  Featured
                </span>
                {featuredBlog.category && (
                  <span className="border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {featuredBlog.category}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                {featuredBlog.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                {featuredBlog.excerpt || `${getCleanText(featuredBlog.content).slice(0, 160)}...`}
              </p>
            </Link>
          </motion.div>
        )}

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {regularBlogs.map((post, index) => {
            const cleanPreview = post.excerpt || getCleanText(post.content);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex min-h-80 flex-col border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime || 5} min
                  </span>
                </div>
                <h3 className="mt-5 line-clamp-2 text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-slate-400">
                  {cleanPreview}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
                >
                  Read article
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="mt-12 text-center text-lg text-slate-400">No articles found.</p>
        )}

        {!isBlogPage && (
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 border border-cyan-300/50 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
            >
              View all posts
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
