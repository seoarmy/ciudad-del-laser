import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blog';
import Seo from '../../components/Seo';

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Blog"
        description="Guías sobre corte y grabado láser: cómo armar tu archivo, qué material elegir y consejos para tu proyecto."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Blog</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">Guías, materiales y consejos para tu proyecto de corte y grabado láser.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="border border-gray-lighter rounded-xl overflow-hidden hover:border-orange transition-colors flex flex-col"
          >
            <img src={post.cover} alt={post.title} className="w-full h-44 object-cover" />
            <div className="p-5 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-orange-dark">{post.category}</span>
              <p className="font-heading text-lg leading-snug">{post.title}</p>
              <p className="text-sm text-gray-text">{post.excerpt}</p>
              <span className="text-xs text-gray-text mt-2">{post.readingTime} de lectura</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
