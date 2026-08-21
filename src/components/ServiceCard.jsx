import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Scissors;
  return (
    <Link
      to={`/${service.slug}`}
      className="group bg-white border border-gray-lighter rounded-xl p-6 shadow-sm hover:border-orange hover:shadow transition-all flex flex-col gap-3"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-light flex items-center justify-center group-hover:bg-orange/10">
        <Icon className="text-orange" size={24} strokeWidth={2} />
      </div>
      <p className="font-heading text-base leading-snug">{service.title}</p>
      <p className="text-sm text-gray-text">{service.heroSubtitle}</p>
      <span className="text-sm font-semibold text-orange-dark mt-auto">Ver más →</span>
    </Link>
  );
}
