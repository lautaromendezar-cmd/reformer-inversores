"use client";

// Simulador del vesting: un control de 0 a 50% y una dona que reparte la sucursal entre el
// inversor principal y el staff clave. El tope (50%) es el del documento.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { movimientoReducido } from "@/lib/motion";

type Textos = { titulo: string; etiqueta: string; inversor: string; staff: string; nota: string };

const R = 80;
const C = 2 * Math.PI * R;

export default function Simulador({ textos }: { textos: Textos }) {
  const [staff, setStaff] = useState(30);
  const arco = useRef<SVGCircleElement>(null);
  const primera = useRef(true);

  useEffect(() => {
    const largo = (staff / 100) * C;
    const destino = { strokeDasharray: `${largo} ${C - largo}` };
    if (primera.current || movimientoReducido()) {
      primera.current = false;
      gsap.set(arco.current, destino);
      return;
    }
    gsap.to(arco.current, { ...destino, duration: 0.5, ease: "power2.out" });
  }, [staff]);

  return (
    <div className="rounded-[1.5rem] bg-noche p-6 text-hueso sm:p-10">
      <h3 className="text-[length:var(--text-h3)]">{textos.titulo}</h3>
      <div className="mt-8 grid items-center gap-8 sm:grid-cols-[auto_1fr]">
        <svg viewBox="0 0 200 200" className="mx-auto size-48 -rotate-90 sm:size-56" aria-hidden="true">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(239 231 221 / 0.14)" strokeWidth="22" />
          <circle ref={arco} cx="100" cy="100" r={R} fill="none" stroke="var(--color-luz)" strokeWidth="22" strokeLinecap="butt" style={{ filter: "drop-shadow(0 0 6px rgb(255 195 122 / 0.6))" }} />
        </svg>
        <dl className="grid gap-5">
          <div>
            <dt className="text-[length:var(--text-chico)] text-hueso/70">{textos.staff}</dt>
            <dd className="cifra text-[clamp(2.5rem,1.6rem+2.5vw,3.75rem)] text-luz">{staff}%</dd>
          </div>
          <div>
            <dt className="text-[length:var(--text-chico)] text-hueso/70">{textos.inversor}</dt>
            <dd className="cifra text-[clamp(2.5rem,1.6rem+2.5vw,3.75rem)]">{100 - staff}%</dd>
          </div>
        </dl>
      </div>
      <label htmlFor="sim-staff" className="mt-8 block text-[length:var(--text-chico)] font-semibold">
        {textos.etiqueta}
      </label>
      <input
        id="sim-staff"
        type="range"
        min={0}
        max={50}
        step={5}
        value={staff}
        onChange={(e) => setStaff(Number(e.target.value))}
        aria-valuetext={`${staff}% para el staff clave, ${100 - staff}% para el inversor principal`}
        className="rango mt-4 w-full"
        style={{ "--lleno": `${(staff / 50) * 100}%` } as React.CSSProperties}
      />
      <div className="mt-2 flex justify-between text-[length:var(--text-dato)] text-hueso/60" aria-hidden="true">
        <span>0%</span>
        <span>50%</span>
      </div>
      <p className="mt-6 text-[length:var(--text-dato)] text-hueso/60">{textos.nota}</p>
    </div>
  );
}
