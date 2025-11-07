// src/domain/Partida.ts
import { Character } from './Character'
export class Partida {
  characters = new Map<string, Character>()
  addCharacter(c: Character) { this.characters.set(c.id, c) }
  getCharacter(id: string) { return this.characters.get(id) }

  getCharactersList() {
    return Array.from(this.characters.values())
  }
}