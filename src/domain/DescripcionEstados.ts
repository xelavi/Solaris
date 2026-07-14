/**
 * Parseo de referencias a estados alterados embebidas en textos de descripción
 * (dotes, innatas, técnicas...). Sintaxis en el JSON de datos: {{estado:ID}},
 * donde ID es el id numérico de src/assets/estadosAlterados.json. Al renderizar,
 * la referencia se sustituye por el nombre del estado en otro color, con un
 * tooltip que muestra su descripción de reglas.
 */

import { obtenerEstado } from "./EstadosAlterados";

const PATRON_REFERENCIA = /\{\{estado:(\d+)\}\}/g;

export interface SegmentoTexto {
  tipo: "texto";
  texto: string;
}

export interface SegmentoEstado {
  tipo: "estado";
  estadoId: number;
  nombre: string;
  descripcion: string;
}

export type Segmento = SegmentoTexto | SegmentoEstado;

/** Divide un texto con referencias {{estado:ID}} en segmentos de texto/estado. */
export function parsearDescripcionEstados(texto: string): Segmento[] {
  if (!texto) return [];

  const segmentos: Segmento[] = [];
  let ultimoIndice = 0;

  for (const coincidencia of texto.matchAll(PATRON_REFERENCIA)) {
    const indice = coincidencia.index ?? 0;
    if (indice > ultimoIndice) {
      segmentos.push({ tipo: "texto", texto: texto.slice(ultimoIndice, indice) });
    }

    const estadoId = Number(coincidencia[1]);
    const estado = obtenerEstado(estadoId);
    segmentos.push(
      estado
        ? {
            tipo: "estado",
            estadoId,
            nombre: estado.nombre,
            descripcion: estado.descripcion,
          }
        : { tipo: "texto", texto: coincidencia[0] },
    );

    ultimoIndice = indice + coincidencia[0].length;
  }

  if (ultimoIndice < texto.length) {
    segmentos.push({ tipo: "texto", texto: texto.slice(ultimoIndice) });
  }

  return segmentos;
}
