import { useParams } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { blogs } from '../../data/blogs';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <FiCalendar className="w-4 h-4" />
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {blog.content}
        </p>
      </div>
    </section>
  );
};

export default BlogDetail;
