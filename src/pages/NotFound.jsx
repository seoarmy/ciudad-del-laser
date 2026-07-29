import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-heading text-4xl uppercase mb-4">404</h1>
      <p className="text-gray-text mb-8">La página que buscás no existe.</p>
      <Link to="/" className="inline-block bg-orange hover:bg-orange-dark text-carbon font-semibold rounded-lg px-6 py-3">
        Volver al inicio
      </Link>
    </section>
  );
}
