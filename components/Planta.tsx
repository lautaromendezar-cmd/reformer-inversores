// Planta de una sala: dos filas de Reformers enfrentadas con un pasillo, como en las salas
// reales. Cada Reformer es un punto de luz. El ancho es proporcional a los m² del formato,
// así las tres plantas juntas se comparan a escala.
//
// `encendidos` decide cuántos puntos brillan (la calculadora de /inversion lo mueve).

type Props = {
  reformers: number; // capacidad máxima del formato
  encendidos?: number;
  m2: number; // superficie máxima, para la escala
  m2Max?: number;
  className?: string;
  titulo: string;
};

export default function Planta({ reformers, encendidos = reformers, m2, m2Max = 350, className = "", titulo }: Props) {
  const porFila = Math.ceil(reformers / 2);
  const ancho = (m2 / m2Max) * 400; // proporcional exacto: en una grilla a escala, las tres miden lo mismo de alto
  const paso = (ancho - 40) / porFila;
  const alto = 150;
  const puntos = Array.from({ length: reformers }, (_, i) => {
    const fila = i % 2;
    const col = Math.floor(i / 2);
    return { x: 20 + paso * (col + 0.5), y: fila === 0 ? 40 : alto - 40, i };
  });
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} preserveAspectRatio="xMinYMax meet" className={className} role="img" aria-label={titulo}>
      <rect x="0.5" y="0.5" width={ancho - 1} height={alto - 1} rx="10" fill="none" stroke="currentColor" strokeOpacity="0.28" />
      {/* El pasillo */}
      <line x1="20" x2={ancho - 20} y1={alto / 2} y2={alto / 2} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 6" />
      {puntos.map((p) => {
        const on = p.i < encendidos;
        return (
          <g key={p.i} data-reformer className={on ? "reformer-on" : "reformer-off"}>
            <circle cx={p.x} cy={p.y} r="11" className="reformer-halo" />
            <rect x={p.x - 3} y={p.y - 14} width="6" height="28" rx="3" className="reformer-cuerpo" />
          </g>
        );
      })}
    </svg>
  );
}
