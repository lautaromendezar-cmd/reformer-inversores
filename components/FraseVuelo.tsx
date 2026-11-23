"use client";

// Una frase grande cuyas letras llegan volando desde la derecha y se arman con el scroll.
// Con "reducir movimiento" (o sin JS) la frase se lee armada.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FraseVuelo({ texto, className = "" }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || movimientoReducido()) return;
    // "words,chars": las palabras quedan enteras (no se parten al final del renglón)
    const split = SplitText.create(el, { type: "words,chars" });
    const azar = gsap.utils.random;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: el, start: "top 108%", end: "top 48%", scrub: 0.9 } });
    split.chars.forEach((c, i) => {
      tl.fromTo(
        c,
        { x: window.innerWidth * azar(0.3, 0.8), y: azar(-240, 240), rotation: azar(-75, 75), opacity: 0 },
        { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5 },
        i * 0.022,
      );
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {texto}
    </p>
  );
}
