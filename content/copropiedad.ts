// /co-propiedad — Documento Maestro B2B §1.2, §1.4, §2.2 punto 4 y la sección "Co-Propiedad
// Dinámica" de la web. Sólo textos del PDF.
import { coPropiedad as comparativaHome } from "./home";

export const portada = {
  antetitulo: "Revolución asociativa",
  titulo: "Sistema de Co-Propiedad (Vesting 50%)",
  bajada:
    "Un modelo dinámico que puede operar sin empleados tradicionales, convirtiendo al staff en socios co-propietarios para garantizar prosperidad económica y alineación de visión compartida.",
  alt: "El equipo de una sucursal Fosque abrazado en la sala, sonriendo a cámara",
};

export const vesting = {
  antetitulo: "Ecosistema de Co-Propiedad",
  titulo: "Programa de vesting",
  texto: [
    "Hasta un 50% de la participación accionaria de la sucursal asignada entre la coordinadora y las instructoras clave, erradicando la rotación de personal y asegurando un compromiso absoluto.",
    "El talento, la gestión y la enseñanza se recompensan mediante participación accionaria, que decide el inversor principal para asignar entre los operadores de la sucursal.",
  ],
  cita: "La prosperidad se comparte. Quienes operan, coordinan y enseñan son parte de la propiedad del negocio.",
  simulador: {
    titulo: "Simulá la asignación",
    etiqueta: "Participación asignada al staff clave",
    inversor: "Inversor principal",
    staff: "Coordinadora e instructoras clave",
    nota: "Simulación ilustrativa. El límite es el 50% del documento; la asignación la decide el inversor principal.",
  },
};

export const comparativa = {
  antetitulo: "Co-Propiedad Dinámica",
  titulo: "La franquicia del pasado frente al ecosistema Fosque",
  columnas: comparativaHome.columnas,
  filas: comparativaHome.filas,
};

// "Quién es quién": los perfiles del formulario de calificación y los roles que nombra el PDF.
// TODO: validar con Gerardo — el PDF nombra los tres perfiles del formulario pero no los define.
export const roles = {
  antetitulo: "Quién es quién",
  titulo: "Los roles de cada sucursal",
  items: [
    {
      nombre: "Inversor principal",
      texto: "Decide cómo asignar la participación accionaria entre los operadores de la sucursal.",
    },
    {
      nombre: "Socio operador dedicado (100%)",
      texto: "Un franquiciado líder o coordinador con perfil de servicios, excelencia y gestión humana.",
    },
    {
      nombre: "Coordinadora e instructoras clave",
      texto: "Pueden recibir hasta el 50% de la participación accionaria de la sucursal mediante el programa de vesting.",
    },
  ],
  perfilesTitulo: "Perfiles para aplicar",
  perfiles: ["Inversor Pasivo", "Inversor Operador", "Operador Técnico"],
};
