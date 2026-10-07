// Datos globales del sitio y utilidades de WhatsApp.

export const SITE = {
  name: 'S. Venegas, escultor',
  autor: 'Serafín Venegas',
  url: 'https://seravenegas.com',
  title: 'S. Venegas, escultor · Escultura en bronce de fauna africana e ibérica',
  description:
    'Escultura cinegética en bronce de Serafín Venegas: fauna africana e ibérica y trofeos por encargo. Consulta disponibilidad y encargos por WhatsApp.',
  lang: 'es',
} as const;

export const WHATSAPP = {
  numero: '34666492454',
  mensaje_obra: 'Hola Serafín, me interesa la obra «{titulo}» ({coleccion}). ¿Está disponible?',
  mensaje_trofeo: 'Hola Serafín, he visto «{titulo}» y me gustaría encargar una pieza similar.',
  mensaje_portada: 'Hola Serafín, me gustaría saber qué obras tienes disponibles.',
  mensaje_general: 'Hola Serafín, vengo de tu web.',
} as const;

/** Construye un enlace wa.me con el mensaje ya codificado. */
export function waLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace de WhatsApp para una obra concreta según sea o no un trofeo. */
export function waObra(titulo: string, coleccion: string, esTrofeo: boolean): string {
  const plantilla = esTrofeo ? WHATSAPP.mensaje_trofeo : WHATSAPP.mensaje_obra;
  const mensaje = plantilla
    .replace('{titulo}', titulo)
    .replace('{coleccion}', coleccion);
  return waLink(mensaje);
}
