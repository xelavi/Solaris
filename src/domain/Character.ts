export type Vec3 = { x:number; y:number; z:number }

export class Character {
  id: string
  name: string
  posicion: string = ""
  oficio : string = ""
  oficio_habilidades: string[] = []
  nivel  : number = 1
  estilo_marcial: string = ""
  estilo_marcial_dotes: string[] = []
  trasfondo: string = ""
  trasfondo_habilidades: string[] = []
  raza: string = ""
  arbol: string = ""


  constructor(id: string, name: string) {
    this.id = id; this.name = name
  }

  getName() {
    return this.name
  }
}