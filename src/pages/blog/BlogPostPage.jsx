import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../../data/blog';
import { SITE, SITE_URL } from '../../data/site';
import Seo from '../../components/Seo';
import JsonLd from '../../components/JsonLd';
import BlogPost from '../../components/BlogPost';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <JsonLd data={articleSchema} />
      <BlogPost post={post} />
    </>
  );
}
