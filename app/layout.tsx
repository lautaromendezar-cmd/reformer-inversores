import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Figtree } from "next/font/google";
import "./globals.css";
import { marca } from "@/content/sitio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BarraMovil from "@/components/BarraMovil";
import Motor from "@/components/Motor";
import Precarga from "@/components/Precarga";
import CursorDiferido from "@/components/CursorDiferido";

// Baloo Bhaijaan 2 (manual de marca) sólo en titulares, en 600 como el B2C.
const baloo = Baloo_Bhaijaan_2({ subsets: ["latin"], weight: ["600"], variable: "--font-baloo", display: "swap" });
// Figtree en cuerpo, interfaz y cifras (tabular-nums).
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-figtree", display: "swap" });

// Bajo NDA: no se indexa hasta que NEXT_PUBLIC_ALLOW_INDEXING sea "true".
const indexar = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(marca.url),
  title: { default: `${marca.nombre} · Franquicia y co-propiedad de Pilates Moderno`, template: `%s · ${marca.nombre}` },
  description: marca.descripcion,
  openGraph: {
    title: marca.nombre,
    description: marca.descripcion,
    locale: "es_AR",
    type: "website",
    siteName: marca.nombre,
  },
  twitter: { card: "summary_large_image", title: marca.nombre, description: marca.descripcion },
  robots: indexar ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#17110e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${baloo.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        {/* Preloader sólo en la primera visita de la sesión. Inline y sin type=module: corre
            siempre, antes del primer pintado. Respaldo: si el JS no llega, se levanta a los 3 s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('frp-visto')){document.documentElement.classList.add('precargando');window.__precargaRespaldo=setTimeout(function(){document.documentElement.classList.remove('precargando')},3000)}}catch(e){}",
          }}
        />
      </head>
      <body>
        <Precarga />
        <a href="#contenido" className="salto">
          Ir al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <BarraMovil />
        <CursorDiferido />
        <Motor />
      </body>
    </html>
  );
}
