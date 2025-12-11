# Plan de Desarrollo de Habilidades Activas y Reacciones

Este documento detalla el plan técnico para implementar las habilidades definidas en `activas.json`.

## Sistema General

### 1. Activas vs Reacciones
Actualmente el sistema diferencia por `descripcion` (string check). Se recomienda añadir un campo `tipo: "Activa" | "Reaccion"` al JSON.
- **Activas**: Se muestran en la barra de acción. Consumen AP en el turno del jugador.
- **Reacciones**: No se muestran en la barra. Se disparan ante eventos (ataque recibido, movimiento enemigo).

### 2. Sistema de Buffs/Estados
Muchas habilidades implican modificaciones temporales de estadísticas (`Adrenalina`, `Apuntar`).
- **Implementación**: Añadir array `estados: Estado[]` a `PersonajeInstancia`.
- **Estructura Estado**: `{ id, nombre, duracion (turnos), efectos: { atributo: valor } }`.
- **Hook**: Al inicio/fin de turno, procesar duración. Al calcular atributos, sumar efectos.

## Detalle de Implementación

### Habilidades Activas

#### 1. Carga (Implementada)
- **Efecto**: Movimiento hacia objetivo + Ataque.
- **Coste**: 2 AP.
- **Estado**: Funcional.

#### 2. Adrenalina
- **Efecto**: +1 Cuerpo hasta el próximo turno.
- **Lógica**:
  - Al usar: Añadir estado "Adrenalina" (+1 Cuerpo, duracion: 1 turno).
  - Validar: "una vez por combate". Necesita flag en `PersonajeInstancia` (`usosHabilidades: { 'Adrenalina': 1 }`).

#### 3. Heal
- **Efecto**: Te curas 12HP.
- **Lógica**:
  - Al usar: `personaje.vidaActual = min(vidaMax, vidaActual + 12)`.
  - Feedback visual: Texto flotante verde.

#### 4. Ataque pesado
- **Efecto**: Daño x2 (x3 si pesada). Coste 2 AP (3 si pesada).
- **Lógica**:
  - Check arma equipada (Ligera/Pesada).
  - Calcular coste AP dinámico.
  - Ejecutar ataque con multiplicador de daño personalizado (pasar argumento `multiplier` a `realizarAtaque`).

#### 5. Apuntar
- **Efecto**: +ToHit/Critico? ("sumar Deadeye ToHit").
- **Lógica**:
  - Añadir estado "Apuntando" (Duración: 1 ataque o 1 turno).
  - Modificar fórmula de ataque para revisar este estado.

#### 6. Procesar
- **Efecto**: Acciones mentales cuestan 0.
- **Lógica**:
  - Pasiva/Estado permanente.
  - En `usarActiva`, si habilidad es `esMental` y tiene estado "Procesar", coste = 0.

#### 7. Instruir
- **Efecto**: Dar ventaja 1 a aliado.
- **Lógica**:
  - Seleccionar aliado (Targeting similar a Ataque/Heal).
  - Añadir estado "Instruido" al aliado.

### Reacciones (Sistema de Eventos)

Se requiere un sistema de "Hooks" o "Triggers" en `usePartida`.

#### Flujo Propuesto
1. Acción ocurre (ej: `ejecutarAtaque`).
2. Antes de aplicar daño, emitir evento `onAttackReceived(defensor, atacante)`.
3. Comprobar reacciones disponibles del defensor (tiene habilidad y AP/Reacción disponible).
4. **UI**: Mostrar popup/modal "¿Usar [Nombre Reacción]?".
5. Si sí: Ejecutar lógica, modificar resultado del ataque, consumir AP/Reacción.

#### Detalle por Habilidad

#### 1. Tensión
- **Trigger**: Recibir ataque.
- **Efecto**: +3 Resistencia contra ese ataque.
- **Lógica**: Aumentar `defensa.lacerante/etc` temporalmente en el cálculo de daño.

#### 2. Interceptar
- **Trigger**: Aliado adyacente recibe ataque.
- **Efecto**: El personaje recibe el daño en lugar del aliado.
- **Lógica**: Cambiar `defensor` en el cálculo de daño.

#### 3. Parry
- **Trigger**: Recibir ataque.
- **Efecto**: Sumar nivel a Evasión.
- **Lógica**: Si `tirada < evasion + nivel`, ataque falla.

#### 4. Ataque de oportunidad
- **Trigger**: Enemigo sale del rango o entra (según reglas D&D suele ser salir).
- **Efecto**: Ataque gratuito.
- **Lógica**: Hook en `moverPersonaje`. Si sale de casilla adyacente a enemigo con OPO, pausar movimiento, ofrecer ataque.

#### 5. Contraataque
- **Trigger**: Recibir ataque (¿y sobrevivir?).
- **Efecto**: Realizar ataque inmediato al atacante.
- **Lógica**: Tras resolver daño, si defensor tiene Contraataque, ejecutar `realizarAtaque(defensor, atacante)`.

## Roadmap Técnico

1.  **Refactor Datos**: Añadir flags a `activas.json`.
2.  **Sistema Estados**: Implementar gestión de buffs en `usePartida`.
3.  **Implementar Activas Simples**: Heal, Adrenalina.
4.  **Sistema Eventos**: Crear bus de eventos o hooks para Reacciones.
5.  **UI Reacciones**: Componente Modal para decidir uso de reacción.
