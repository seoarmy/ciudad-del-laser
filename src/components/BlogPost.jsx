import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { BLOG_POSTS } from '../data/blog';
import { buildWhatsappLink, SITE } from '../data/site';

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
}

function TransactionalBox({ serviceSlug, text }) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return null;
  return (
    <div className="my-6 bg-orange/10 border border-orange rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <p className="font-semibold text-carbon">{text}</p>
      <Link
        to={`/${service.slug}`}
        className="shrink-0 bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-5 py-2 text-sm text-center transition-colors"
      >
        Ver servicio
      </Link>
    </div>
  );
}

export default function BlogPost({ post }) {
  const headings = post.content.filter((b) => b.type === 'h2').map((b) => ({ text: b.text, id: slugify(b.text) }));
  const [active, setActive] = useState(headings[0]?.id);
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedServices = post.relatedServices.map(getServiceBySlug).filter(Boolean);

  return (
    <article className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
      <div className="min-w-0">
        <header className="mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wide text-orange-dark bg-orange/10 rounded px-3 py-1 mb-4">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">{post.title}</h1>
          <p className="text-sm text-gray-text">
            {new Date(post.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}{post.readingTime} de lectura
          </p>
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-auto rounded-xl mt-6 border border-gray-lighter"
          />
        </header>

        <div className="prose-blog max-w-[70ch] leading-relaxed">
          {post.content.map((block, i) => {
            if (block.type === 'h2') {
              const id = slugify(block.text);
              return (
                <h2
                  key={i}
                  id={id}
                  ref={(el) => (refs.current[id] = el)}
                  className="font-heading text-2xl uppercase mt-10 mb-4 scroll-mt-24"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'cta') {
              return <TransactionalBox key={i} serviceSlug={block.service} text={block.text} />;
            }
            return (
              <p key={i} className="text-gray-text mb-4">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-12 bg-carbon text-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading text-xl uppercase mb-1">¿Listo para cotizar tu proyecto?</p>
            <p className="text-sm text-gray-300">Contanos qué necesitás y te respondemos por WhatsApp.</p>
          </div>
          <a
            href={buildWhatsappLink(`Hola! Leí el artículo "${post.title}" y quiero cotizar un trabajo.`)}
            target="_blank"
            rel="noreferrer"
            className="bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3 text-sm whitespace-nowrap"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading text-xl uppercase mb-4">Artículos relacionados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="border border-gray-lighter rounded-xl overflow-hidden hover:border-orange transition-colors"
                >
                  <img src={p.cover} alt={p.title} className="w-full h-32 object-cover" />
                  <p className="p-3 text-sm font-semibold">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 h-fit flex flex-col gap-6">
        <div className="bg-white border border-gray-lighter rounded-xl p-5">
          <p className="font-heading uppercase text-sm mb-3">Cotización rápida</p>
          <a
            href={buildWhatsappLink('Hola! Quiero cotizar un trabajo de corte/grabado láser.')}
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-4 py-3 text-sm"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        {relatedServices.length > 0 && (
          <div className="bg-white border border-gray-lighter rounded-xl p-5">
            <p className="font-heading uppercase text-sm mb-3">Servicios relacionados</p>
            <ul className="space-y-2">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="text-sm text-carbon hover:text-orange-dark font-medium">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {headings.length > 0 && (
          <div className="bg-white border border-gray-lighter rounded-xl p-5">
            <p className="font-heading uppercase text-sm mb-3">En este artículo</p>
            <ul className="space-y-2 border-l border-gray-lighter">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={`block pl-3 -ml-px text-sm border-l-2 ${
                      active === h.id ? 'border-orange text-orange-dark font-semibold' : 'border-transparent text-gray-text hover:text-carbon'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-carbon text-white rounded-xl p-5">
          <p className="font-heading uppercase text-sm mb-1 text-orange">{SITE.name}</p>
          <p className="text-sm text-gray-300">Años de trayectoria cortando y grabando a medida para empresas, instituciones y particulares.</p>
        </div>
      </aside>
    </article>
  );
}
