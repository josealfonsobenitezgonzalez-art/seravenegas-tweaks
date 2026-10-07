// Carga de obras.json, resolución de imágenes con astro:assets y campos derivados.
import type { ImageMetadata } from 'astro';
import datos from '../data/obras.json';
import { waObra, waLink, WHATSAPP } from './site';

// --- Tipos de la fuente de datos -------------------------------------------
export interface ObraRaw {
  id: string;
  orden: number;
  titulo: string;
  medidas_cm: string | null;
  serie: number | null;
  material: string;
  imagen: string;
  imagen_recorte: string;
  estado: 'confirmado' | 'pendiente';
  encargo?: boolean;
  nota?: string;
}

export interface ColeccionRaw {
  id: string;
  nombre: string;
  descripcion: string;
  obra_tarjeta: string;
  encargo?: boolean;
  obras: ObraRaw[];
}

interface DatosRaw {
  colecciones: ColeccionRaw[];
  portada: { obra: string };
}

// --- Resolución de imágenes del proyecto -----------------------------------
// Todas las imágenes viven en src/assets/img. astro:assets las optimiza.
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/**/*.{jpg,jpeg,png}',
  { eager: true },
);

/** Devuelve el ImageMetadata para una ruta tipo "img/africa/x.jpg". */
export function img(ruta: string): ImageMetadata {
  const clave = `/src/assets/${ruta}`;
  const mod = archivos[clave];
  if (!mod) {
    throw new Error(`Imagen no encontrada: ${clave}`);
  }
  return mod.default;
}

// --- Modelo enriquecido que consume la interfaz ----------------------------
export interface Obra {
  id: string;
  titulo: string;
  coleccionId: string;
  coleccionNombre: string;
  esTrofeo: boolean;
  material: string;
  medidas: string | null;
  serie: number | null;
  /** Línea de metadatos ya formateada para la ficha. */
  meta: string;
  /** Texto del botón de contacto. */
  cta: string;
  /** Enlace de WhatsApp para esta obra. */
  wa: string;
  /** Texto alternativo accesible. */
  alt: string;
  imagen: ImageMetadata;
  recorte: ImageMetadata;
}

export interface Coleccion {
  id: string;
  nombre: string;
  descripcion: string;
  esTrofeo: boolean;
  obras: Obra[];
  /** Índice (0-based) de la obra usada como tarjeta dentro de la colección. */
  indiceTarjeta: number;
  /** Obra usada como tarjeta de la colección. */
  tarjeta: Obra;
}

const d = datos as unknown as DatosRaw;

function metaDe(o: ObraRaw, esTrofeo: boolean): string {
  if (esTrofeo) {
    return `${o.material} · Pieza por encargo`;
  }
  // Si falta algún dato (obra pendiente), se oculta medidas/serie.
  if (o.medidas_cm && o.serie) {
    return `${o.material} · ${o.medidas_cm} cm · Serie de ${o.serie}`;
  }
  return o.material;
}

export const colecciones: Coleccion[] = d.colecciones.map((c) => {
  const esTrofeo = Boolean(c.encargo);
  const obras: Obra[] = c.obras.map((o) => ({
    id: o.id,
    titulo: o.titulo,
    coleccionId: c.id,
    coleccionNombre: c.nombre,
    esTrofeo,
    material: o.material,
    medidas: o.medidas_cm,
    serie: o.serie,
    meta: metaDe(o, esTrofeo),
    cta: esTrofeo ? 'Encargar una pieza similar' : 'Preguntar por esta obra',
    wa: waObra(o.titulo, c.nombre, esTrofeo),
    alt: `Escultura en bronce: ${o.titulo}`,
    imagen: img(o.imagen),
    recorte: img(o.imagen_recorte),
  }));
  const indiceTarjeta = Math.max(
    0,
    c.obras.findIndex((o) => o.id === c.obra_tarjeta),
  );
  return {
    id: c.id,
    nombre: c.nombre,
    descripcion: c.descripcion,
    esTrofeo,
    obras,
    indiceTarjeta,
    tarjeta: obras[indiceTarjeta],
  };
});

/** Devuelve una obra por id buscando en todas las colecciones. */
export function obraPorId(id: string): Obra | undefined {
  for (const c of colecciones) {
    const o = c.obras.find((x) => x.id === id);
    if (o) return o;
  }
  return undefined;
}

export const portada = obraPorId(d.portada.obra)!;

// Enlace de WhatsApp específico para la obra de portada (texto del diseño).
export const waPortadaObra = waLink(
  'Hola Serafín, me interesa el macho montés sobre roca de la portada.',
);
export const waDisponibilidad = waLink(WHATSAPP.mensaje_portada);
export const waGeneral = waLink(WHATSAPP.mensaje_general);
export const waContacto = waLink(
  'Hola Serafín, me gustaría información sobre existencias o encargos.',
);
export const waNav = waLink('Hola Serafín, me interesa tu obra en bronce.');
