import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, SITE_URL } from '../data/site';

const DEFAULT_IMAGE = 'https://picsum.photos/seed/ciudad-del-laser-og/1200/630';

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export default function Seo({ title, description, image = DEFAULT_IMAGE }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = fullTitle;

    if (description) {
      setMetaByName('description', description);
      setMetaByProperty('og:description', description);
      setMetaByName('twitter:description', description);
    }

    setCanonical(url);

    setMetaByProperty('og:url', url);
    setMetaByProperty('og:title', fullTitle);
    setMetaByProperty('og:image', image);
    setMetaByName('twitter:title', fullTitle);
    setMetaByName('twitter:image', image);
  }, [title, description, image, pathname]);

  return null;
}
