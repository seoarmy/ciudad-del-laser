import Seo from '../components/Seo';
import StepBlock from '../components/StepBlock';
import MaterialTable from '../components/MaterialTable';
import { MATERIAL_FAMILIES, MIN_DISTANCE_TABLE } from '../data/materials';
import { buildWhatsappLink, SITE } from '../data/site';

const ALL_MATERIALS = MATERIAL_FAMILIES.flatMap((f) => f.items);

const TIPS = [
  {
    title: 'Compartí las líneas de corte entre piezas contiguas',
    text: 'Si dos piezas van pegadas, borrá una de las dos líneas superpuestas en vez de dejarlas duplicadas: solo te cobramos el proporcional del material utilizado.',
  },
  {
    title: 'Acomodá las piezas para aprovechar mejor el material',
    text: 'Ordenalas compactas, sin espacios sueltos entre ellas. Acordate: solo se cobra el proporcional, así que cuanto mejor aprovechado el rectángulo, menor el costo.',
  },
  {
    title: 'Un archivo, varios rectángulos',
    text: 'Si necesitás distintos materiales o espesores, dibujá un rectángulo por placa dentro del mismo archivo. Ejemplo: MDF 3mm 900x600, alto impacto 2mm 900x600 y MDF 1mm 600x300, todos juntos.',
  },
  {
    title: 'Convertí las tipografías a curvas',
    text: 'Todo texto tiene que estar convertido a curvas y con el color de línea correspondiente asignado, no como texto editable.',
  },
  {
    title: 'Respetá la distancia mínima entre líneas',
    text: 'Entre línea, línea paralela y piezas, según el material y el espesor:',
    table: true,
  },
  {
    title: 'Explotá todos los hatchs y bloques',
    text: 'Cada línea tiene que poder seleccionarse de forma individual antes de exportar, no agrupada en un bloque.',
  },
];

const PROGRAMS = ['Rhinoceros (.3dm)', 'AutoCAD (.dwg / .dxf)', 'CorelDraw (.cdr)', 'Illustrator (.ai / .pdf)'];

export default function ComoArmarTuArchivo() {
  return (
    <>
      <Seo
        title="Cómo armar tu archivo para cotizar corte láser"
        description="Guía paso a paso para armar tu archivo de corte láser: materialidad, tamaño real, colores de línea (corte/marcado/grabado) y formatos aceptados (.dwg, .ai, .cdr, .3dm)."
      />
      <section className="bg-carbon text-white text-center py-16 md:py-20 px-4">
        <h1 className="font-heading text-3xl md:text-5xl uppercase mb-4">Cómo armar tu archivo para cotizar</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Seguí estos 4 pasos para que tu archivo esté listo para cotizar y cortar sin ida y vuelta.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20 flex flex-col gap-16">
        <StepBlock number="1" title="Materialidad y espesor">
          <p>Elegí el material y espesor de tu pieza. Trabajamos placas de 900x600mm y 600x300mm.</p>
          <div className="mt-4">
            <MaterialTable rows={ALL_MATERIALS} />
          </div>
          <p className="mt-3 text-sm">
            Si tu material no está en la lista, <span className="text-orange-dark font-semibold">no dudes en consultarnos</span>.
          </p>
        </StepBlock>

        <StepBlock number="2" title="Dibujá un rectángulo">
          <p>
            Armá un rectángulo del tamaño real en milímetros. Ubicá todas tus piezas dentro de ese rectángulo,
            dejando al menos 5mm libres al borde. Dibujá tantos rectángulos como placas necesites.
          </p>
          <p className="mt-3 font-semibold text-carbon">Solo te cobramos el proporcional del material utilizado.</p>
        </StepBlock>

        <StepBlock number="3" title="Asignale sus colores">
          <p>Usá estos colores de línea para indicar qué tiene que hacer el láser en cada trazo:</p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-600 inline-block" /> Línea roja = cortar</li>
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-blue-600 inline-block" /> Línea azul = marcar</li>
            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-600 inline-block" /> Línea verde = grabar</li>
          </ul>
          <p className="mt-4 text-sm text-gray-text">
            Te lo cotizamos, nos confirmás, lo hacemos y lo pasás a buscar. ¡Gracias!
          </p>
        </StepBlock>

        <StepBlock number="4" title="Enviá tu archivo por mail">
          <p>Aceptamos los siguientes formatos:</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {PROGRAMS.map((p) => (
              <li key={p} className="bg-gray-light rounded-lg px-3 py-2 text-sm">{p}</li>
            ))}
          </ul>

          <p className="mt-6 font-semibold text-carbon">Tips antes de enviar:</p>
          <div className="mt-3 flex flex-col gap-4">
            {TIPS.map((tip, i) => (
              <div key={tip.title}>
                <p className="font-semibold text-sm">
                  {i + 1}. {tip.title}
                </p>
                <p className="text-sm text-gray-text">{tip.text}</p>
                {tip.table && (
                  <div className="mt-2 overflow-x-auto rounded-lg border border-gray-lighter">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-carbon text-white">
                          <th className="text-left px-4 py-2 font-semibold">Material</th>
                          <th className="text-left px-4 py-2 font-semibold">Espesor</th>
                          <th className="text-left px-4 py-2 font-semibold">Dist. mínima</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MIN_DISTANCE_TABLE.map((row, r) => (
                          <tr key={`${row.material}-${row.espesor}`} className={r % 2 ? 'bg-gray-light' : 'bg-white'}>
                            <td className="px-4 py-2 font-medium">{row.material}</td>
                            <td className="px-4 py-2 text-gray-text">{row.espesor}</td>
                            <td className="px-4 py-2 text-gray-text">{row.distancia}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm font-semibold text-orange-dark">
            Seguí estos tips para reducir el precio y evitar cualquier inconveniente.
          </p>

          <a
            href={`mailto:${SITE.fileSubmissionEmail}`}
            className="inline-block mt-6 bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-6 py-3 text-sm"
          >
            Enviar archivo a {SITE.fileSubmissionEmail}
          </a>
        </StepBlock>
      </section>

      <section className="bg-carbon text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-4xl uppercase mb-4">¿Preferís que te ayudemos?</h2>
          <p className="text-gray-300 mb-8">Contanos tu proyecto y te asesoramos para armar el archivo correcto.</p>
          <a
            href={buildWhatsappLink('Hola! Necesito ayuda para armar mi archivo para cotizar.')}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-orange hover:bg-orange-dark text-carbon font-bold rounded-lg px-10 py-4"
          >
            Pedir ayuda por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
