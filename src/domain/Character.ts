export type Vec3 = { x: number; y: number; z: number };

export interface ArbolAttributes {
  cuerpo: number;
  agilidad: number;
  mente: number;
  rangoCritico: number;
  habilidadesExtra: number;
  limiteHabilidad: number;
  acciones: number;
  reacciones: number;
  hp: number;
  poderio: number;
  movimiento: number;
  resistencia: number;
  regeneracion: number;
  evasion: number;
  iniciativa: number;
  punteria: number;
  puntosHabilidad: number;
}

export class Character {
  id: string;
  name: string;
  posicion: string = "";
  oficio: string = "";
  oficio_habilidades: string[] = [];
  oficio_dotes: number[] = [];
  nivel: number = 1;
  estilo_marcial: string = "";
  estilo_marcial_dotes: string[] = [];
  trasfondo: string = "";
  trasfondo_habilidades: string[] = [];
  raza: string = "";
  arbol: string = "";
  habilidades: string = ""; // JSON string de habilidades con rangos asignados
  armas: number[] = []; // IDs de las armas seleccionadas
  armaduras: number[] = []; // IDs de las armaduras seleccionadas
  atributos: ArbolAttributes = {
    cuerpo: 0,
    agilidad: 0,
    mente: 0,
    rangoCritico: 24,
    habilidadesExtra: 0,
    limiteHabilidad: 5,
    acciones: 0,
    reacciones: 0,
    hp: 10,
    poderio: 0,
    movimiento: 3,
    resistencia: 0,
    regeneracion: 2,
    evasion: 12,
    iniciativa: 0,
    punteria: 0,
    puntosHabilidad: 10,
  };

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
