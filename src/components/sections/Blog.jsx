import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar, FiClock, FiSearch, FiTag } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { blogs } from '../../data/blogs';

/**
 * Helper function to strip Markdown syntax so it looks like plain text
 * in the blog preview cards.
 */
const getCleanText = (markdown) => {
  if (!markdown) return '';
  return markdown
    .replace(/^#+\s+/gm, '')                // Remove headers (##, ###)
    .replace(/\*\*|__/g, '')                // Remove bold
    .replace(/\*|_/g, '')                   // Remove italic
    .replace(/```[\s\S]*?```/g, '')          // Remove multi-line code blocks
    .replace(/`(.+?)`/g, '$1')              // Remove inline code backticks
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')      // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '')         // Remove images
    .replace(/>\s+/g, '')                   // Remove blockquotes
    .replace(/-|\*|\d+\./g, '')              // Remove list bullets
    .replace(/\n+/g, ' ')                   // Replace newlines with spaces
    .trim();
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, []);

  // Filter blogs based on search and tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = searchQuery === '' || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        getCleanText(blog.content).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || (blog.tags && blog.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Featured blog (first featured or first blog)
  const featuredBlog = blogs.find(blog => blog.featured) || blogs[0];
  const regularBlogs = filteredBlogs.filter(blog => blog.id !== featuredBlog?.id);

  return (
    <section
      id="blog"
      className={`py-20 ${isBlogPage ? 'bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' : 'bg-white dark:bg-gray-800'}`}
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
            Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on software engineering and web development.
          </p>
        </motion.div>

        {isBlogPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-8"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
              />
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedTag(null)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                      selectedTag === tag
                        ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400'
                    }`}
                  >
                    <FiTag className="w-3 h-3" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Featured Blog (only on blog page) */}
        {isBlogPage && featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Link to={`/blog/${featuredBlog.id}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-1 shadow-2xl hover:shadow-primary-500/50 transition-all duration-300">
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                    {featuredBlog.category && (
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-semibold">
                        {featuredBlog.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                    {featuredBlog.excerpt || getCleanText(featuredBlog.content).substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <time dateTime={featuredBlog.date}>
                        {new Date(featuredBlog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      <span>{featuredBlog.readingTime || 5} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularBlogs.map((post, index) => {
            const cleanPreview = post.excerpt || getCleanText(post.content);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-primary-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>
                
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <FiCalendar className="w-3 h-3" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <FiClock className="w-3 h-3" />
                        <span>{post.readingTime} min</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow text-sm">
                    {cleanPreview}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors mt-auto group/link"
                  >
                    Read More
                    <FiExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No articles found matching your search.
            </p>
          </motion.div>
        )}

        {!isBlogPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-500 dark:to-purple-500 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 dark:hover:from-primary-600 dark:hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Posts
              <FiExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
