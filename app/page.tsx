import Hero from "@/components/home/Hero";
import Cifras from "@/components/home/Cifras";
import Manifiesto from "@/components/home/Manifiesto";
import PorQue from "@/components/home/PorQue";
import CoPropiedad from "@/components/home/CoPropiedad";
import Formatos from "@/components/home/Formatos";
import Quiz from "@/components/home/Quiz";
import Cierre from "@/components/home/Cierre";

// Recorrido de la luz: noche (hero) → lino (cifras) → frío → 2700K (manifiesto) → corteza →
// lino → noche (formatos) → arena (quiz) → corteza (dossier) → noche (aplicación y footer).
export default function Home() {
  return (
    <>
      <Hero />
      <Cifras />
      <Manifiesto />
      <PorQue />
      <CoPropiedad />
      <Formatos />
      <Quiz />
      <Cierre />
    </>
  );
}
