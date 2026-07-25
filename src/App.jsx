import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappFloatingButton from './components/WhatsappFloatingButton';
import JsonLd from './components/JsonLd';
import { SITE, SITE_URL } from './data/site';

import Home from './pages/Home';
import ServiceLanding from './pages/ServiceLanding';
import Materiales from './pages/Materiales';
import Galeria from './pages/Galeria';
import Personalizador from './pages/Personalizador';
import ComoArmarTuArchivo from './pages/ComoArmarTuArchivo';
import EnviosYPagos from './pages/EnviosYPagos';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import DondeEstamos from './pages/DondeEstamos';
import Contacto from './pages/Contacto';
import BlogIndex from './pages/blog/BlogIndex';
import BlogPostPage from './pages/blog/BlogPostPage';
import NotFound from './pages/NotFound';

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  url: SITE_URL,
  email: SITE.email,
  image: `${SITE_URL}/favicon.svg`,
  areaServed: 'Buenos Aires, Argentina',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C. Dr. Juan Felipe Aranguren 1870',
    addressLocality: 'Ciudad Autónoma de Buenos Aires',
    postalCode: 'C1406',
    addressCountry: 'AR',
  },
  sameAs: [SITE.instagramUrl],
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios/:slug" element={<ServiceLanding />} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/personalizador" element={<Personalizador />} />
          <Route path="/como-armar-tu-archivo" element={<ComoArmarTuArchivo />} />
          <Route path="/envios-y-pagos" element={<EnviosYPagos />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/donde-estamos" element={<DondeEstamos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsappFloatingButton />
    </div>
  );
}

export default App;
