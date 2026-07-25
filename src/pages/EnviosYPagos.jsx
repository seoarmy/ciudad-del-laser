import Seo from '../components/Seo';

export default function EnviosYPagos() {
  return (
    <>
      <Seo
        title="Envíos y formas de pago"
        description="Información sobre envíos, retiro y formas de pago de Ciudad del Láser."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Envíos y formas de pago</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">Todo lo que necesitás saber para recibir tu pedido y coordinar el pago.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20 flex flex-col gap-12">
        <div>
          <h2 className="font-heading text-2xl uppercase mb-4">Envíos</h2>
          {/* TODO: contenido a definir con el cliente */}
          <p className="text-gray-text">
            Contenido a definir con el cliente: zonas de cobertura, costos y tiempos de envío/retiro.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl uppercase mb-4">Formas de pago</h2>
          {/* TODO: contenido a definir con el cliente */}
          <p className="text-gray-text">
            Contenido a definir con el cliente: medios de pago aceptados y condiciones.
          </p>
        </div>
      </section>
    </>
  );
}
