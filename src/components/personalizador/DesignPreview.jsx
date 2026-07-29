import { useRef } from 'react';

// Área de trabajo compartida entre Mate (elipse) y Placa (rectángulo): dibuja
// el fondo que le pasa el padre, superpone grilla opcional, el borde del área
// grabable, y el texto/logo arrastrables con el mouse (posición en % 0-100
// relativa al área grabable, así funciona igual sea elipse o rectángulo).
export default function DesignPreview({
  svgRef: externalSvgRef,
  viewBox,
  children,
  printableBox, // { x, y, width, height } en unidades de viewBox, bounding box del área grabable
  grid,
  overflowColor,
  text,
  onTextDrag,
  logo,
  onLogoDrag,
}) {
  const internalSvgRef = useRef(null);
  const svgRef = externalSvgRef || internalSvgRef;
  const dragState = useRef(null);

  function toPercent(clientX, clientY) {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM().inverse();
    const svgPoint = pt.matrixTransform(ctm);
    const relX = (svgPoint.x - printableBox.x) / printableBox.width;
    const relY = (svgPoint.y - printableBox.y) / printableBox.height;
    return {
      x: Math.min(100, Math.max(0, relX * 100)),
      y: Math.min(100, Math.max(0, relY * 100)),
    };
  }

  function startDrag(kind, onDrag) {
    return (e) => {
      e.preventDefault();
      dragState.current = { kind, onDrag };
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', stopDrag);
    };
  }

  function handleMove(e) {
    if (!dragState.current) return;
    const { x, y } = toPercent(e.clientX, e.clientY);
    dragState.current.onDrag(x, y);
  }

  function stopDrag() {
    dragState.current = null;
    window.removeEventListener('pointermove', handleMove);
    window.removeEventListener('pointerup', stopDrag);
  }

  const gridLines = [];
  if (grid) {
    const step = printableBox.width / 4;
    for (let i = 1; i < 4; i++) {
      gridLines.push(
        <line
          key={`v${i}`}
          x1={printableBox.x + step * i}
          y1={printableBox.y}
          x2={printableBox.x + step * i}
          y2={printableBox.y + printableBox.height}
          stroke="#999"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      );
    }
    const stepY = printableBox.height / 4;
    for (let i = 1; i < 4; i++) {
      gridLines.push(
        <line
          key={`h${i}`}
          x1={printableBox.x}
          y1={printableBox.y + stepY * i}
          x2={printableBox.x + printableBox.width}
          y2={printableBox.y + stepY * i}
          stroke="#999"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      );
    }
  }

  const logoX = printableBox.x + (logo ? (logo.x / 100) * printableBox.width : 0);
  const logoY = printableBox.y + (logo ? (logo.y / 100) * printableBox.height : 0);
  const textX = printableBox.x + (text.x / 100) * printableBox.width;
  const textY = printableBox.y + (text.y / 100) * printableBox.height;

  return (
    <svg ref={svgRef} viewBox={viewBox} className="w-full h-full touch-none">
      {children}
      {gridLines}

      {logo && (
        <g
          transform={`translate(${logoX} ${logoY}) rotate(${logo.rotation}) scale(${logo.scale})`}
          onPointerDown={startDrag('logo', onLogoDrag)}
          style={{ cursor: 'grab' }}
        >
          <image
            href={logo.url}
            x={-logo.baseSize / 2}
            y={-logo.baseSize / 2}
            width={logo.baseSize}
            height={logo.baseSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )}

      <text
        x={textX}
        y={textY}
        textAnchor={text.align}
        fill={overflowColor}
        fontSize={text.fontSize}
        transform={`rotate(${text.rotation} ${textX} ${textY})`}
        style={{ fontFamily: text.fontCss, cursor: 'grab' }}
        onPointerDown={startDrag('text', onTextDrag)}
      >
        {(text.value || '').split('\n').map((line, i) => (
          <tspan key={i} x={textX} dy={i === 0 ? 0 : text.fontSize * 1.2}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
