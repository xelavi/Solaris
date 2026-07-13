<template>
  <div ref="contenedor" :class="['ficha-root', { page: !embebido }]">
    <div class="mx-auto" :style="{ width: '1280px', zoom }">
      <!-- Barra superior: volver + pestañas -->
      <div v-if="!embebido" class="fx-topbar">
        <button @click="volver" class="fx-back">← Volver a personajes</button>
        <div class="fx-tabs">
          <button
            :class="['fx-tab', { on: currentTab === 'ficha' }]"
            @click="currentTab = 'ficha'"
          >
            Ficha
          </button>
          <button
            :class="['fx-tab', { on: currentTab === 'arbol' }]"
            @click="currentTab = 'arbol'"
          >
            Árbol
          </button>
          <button
            :class="['fx-tab', { on: currentTab === 'inventario' }]"
            @click="currentTab = 'inventario'"
          >
            Inventario
          </button>
        </div>
        <div class="fx-actions">
          <button @click="subirNivel" class="fx-levelup">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 3.5a1 1 0 0 1 .77.36l5 6A1 1 0 0 1 15 11.5h-2.5v4a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4H5a1 1 0 0 1-.77-1.64l5-6A1 1 0 0 1 10 3.5Z" />
            </svg>
            Subir de nivel
          </button>
          <button @click="editar" class="fx-edit">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5a1 1 0 0 1-.44.26l-3 .857a.5.5 0 0 1-.617-.618l.857-3a1 1 0 0 1 .26-.439l8.5-8.5Z" />
            </svg>
            Editar
          </button>
        </div>
      </div>

      <!-- ================= FICHA ================= -->
      <div v-if="currentTab === 'ficha'">
        <!-- Fila 1: identidad + puntos de vida -->
        <div class="fx-row1">
          <div class="fx-panel fx-ident">
            <div class="fx-portrait">
              {{ (personaje.nombre || "?").charAt(0).toUpperCase()
              }}<span class="fx-lvl tnum">{{ personaje.nivel }}</span>
            </div>
            <div class="fx-ident-info">
              <h1>{{ personaje.nombre || "Sin nombre" }}</h1>
              <div class="fx-role">
                <template v-if="personaje.especialidad || personaje.estiloMarcial">
                  {{
                    [personaje.especialidad, personaje.estiloMarcial]
                      .filter(Boolean)
                      .join(" · ")
                  }}
                </template>
                <template v-else>Personaje</template>
              </div>
              <div class="fx-chips">
                <span v-if="personaje.trasfondo" class="fx-chip">{{
                  personaje.trasfondo
                }}</span>
                <span class="fx-chip">Nivel {{ personaje.nivel }}</span>
              </div>
            </div>
            <div class="fx-ident-stats">
              <button
                type="button"
                class="fx-mini"
                :class="{ 'fx-mini-click': embebido }"
                :disabled="!embebido"
                :title="embebido ? 'Tirar Iniciativa (2d12 + modificador)' : ''"
                @click="usarIniciativa"
              >
                <span class="fx-mini-l">Iniciativa</span>
                <span
                  class="fx-mini-v tnum"
                  :class="{ boost: ef.iniciativa !== personaje.agilidad.iniciativa }"
                  >{{ formatoMod(ef.iniciativa) }}</span
                >
              </button>
            </div>
          </div>

          <div class="fx-panel">
            <div class="fx-phead">
              <span class="fx-grow">Puntos de vida</span>
              <button
                v-if="embebido"
                class="fx-gear"
                :class="{ on: editVida }"
                title="Ajustar vida (solo en la partida)"
                aria-label="Ajustar vida"
                @click="editVida = !editVida"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                  />
                </svg>
              </button>
            </div>
            <div class="fx-hpwrap">
              <div class="fx-hpmain">
                <div class="fx-hpbox cur">
                  <div class="fx-hp-cap">Actual</div>
                  <div class="fx-hp-field tnum">
                    {{ personaje.hp.actual
                    }}<span v-if="bono('hp')" class="fx-hp-bonus"
                      >+{{ bono("hp") }}</span
                    >
                  </div>
                </div>
                <div class="fx-hpbox">
                  <div class="fx-hp-cap">Máximo</div>
                  <div class="fx-hp-field tnum">{{ personaje.hp.maximo }}</div>
                </div>
              </div>
              <div v-if="editVida" class="fx-hpedit">
                <span class="fx-hpedit-l">Vida extra</span>
                <input
                  type="number"
                  class="fx-hpinput tnum"
                  min="0"
                  :value="bono('hp')"
                  @input="
                    fijarBono('hp', ($event.target as HTMLInputElement).value)
                  "
                />
              </div>
              <div class="fx-hpbar">
                <span :style="{ width: hpPct + '%' }"></span>
              </div>
            </div>
          </div>
        </div>


        <!-- Fila 2: atributos + armadura/velocidad -->
        <div class="fx-row2">
          <div class="fx-panel">
            <div class="fx-phead">
              <span class="fx-grow">Atributos</span>
              <button
                v-if="embebido"
                class="fx-gear"
                :class="{ on: editAtributos }"
                title="Ajustar atributos (solo en la partida)"
                aria-label="Ajustar atributos"
                @click="editAtributos = !editAtributos"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                  />
                </svg>
              </button>
            </div>
            <div class="fx-attrs">
              <div class="fx-attr" style="--c: var(--cu)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Cuerpo</span>
                  <span v-if="editAtributos" class="fx-hexctrl">
                    <button class="fx-numb" @click="ajustarBono('cuerpo', -1)">−</button>
                    <button class="fx-numb" @click="ajustarBono('cuerpo', 1)">＋</button>
                  </span>
                  <div class="fx-hex" :class="{ boost: bono('cuerpo') }">
                    <span class="tnum">{{ ef.cuerpo }}</span>
                  </div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Poderío</span>
                    <span class="fx-num" :class="{ boost: ef.poderio !== personaje.cuerpo.poderio }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('poderio', -1)">−</button>
                      <b class="tnum">{{ ef.poderio }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('poderio', 1)">＋</button>
                    </span>
                  </div>
                  <div class="fx-arow"><span>Movimiento</span>
                    <span class="fx-num" :class="{ boost: ef.movimiento !== personaje.cuerpo.movimiento }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('movimiento', -1)">−</button>
                      <b class="tnum">{{ ef.movimiento }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('movimiento', 1)">＋</button>
                    </span>
                  </div>
                  <div class="fx-arow"><span>Resistencia</span>
                    <span class="fx-num" :class="{ boost: ef.resistencia !== personaje.cuerpo.resistencia }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('resistencia', -1)">−</button>
                      <b class="tnum">{{ ef.resistencia }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('resistencia', 1)">＋</button>
                    </span>
                  </div>
                </div>
              </div>

              <div class="fx-attr" style="--c: var(--ag)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Agilidad</span>
                  <span v-if="editAtributos" class="fx-hexctrl">
                    <button class="fx-numb" @click="ajustarBono('agilidad', -1)">−</button>
                    <button class="fx-numb" @click="ajustarBono('agilidad', 1)">＋</button>
                  </span>
                  <div class="fx-hex" :class="{ boost: bono('agilidad') }">
                    <span class="tnum">{{ ef.agilidad }}</span>
                  </div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Esquiva</span>
                    <span class="fx-num" :class="{ boost: ef.esquiva !== personaje.agilidad.esquiva }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('esquiva', -1)">−</button>
                      <b class="tnum">{{ ef.esquiva }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('esquiva', 1)">＋</button>
                    </span>
                  </div>
                  <div class="fx-arow"><span>Iniciativa</span>
                    <span class="fx-num" :class="{ boost: ef.iniciativa !== personaje.agilidad.iniciativa }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('iniciativa', -1)">−</button>
                      <b class="tnum">{{ formatoMod(ef.iniciativa) }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('iniciativa', 1)">＋</button>
                    </span>
                  </div>
                  <div class="fx-arow"><span>Deadeye</span>
                    <span class="fx-num" :class="{ boost: ef.deadeye !== personaje.agilidad.deadeye }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('deadeye', -1)">−</button>
                      <b class="tnum">{{ ef.deadeye }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('deadeye', 1)">＋</button>
                    </span>
                  </div>
                </div>
              </div>

              <div class="fx-attr" style="--c: var(--me)">
                <div class="fx-attr-top">
                  <span class="fx-attr-name">Mente</span>
                  <span v-if="editAtributos" class="fx-hexctrl">
                    <button class="fx-numb" @click="ajustarBono('mente', -1)">−</button>
                    <button class="fx-numb" @click="ajustarBono('mente', 1)">＋</button>
                  </span>
                  <div class="fx-hex" :class="{ boost: bono('mente') }">
                    <span class="tnum">{{ ef.mente }}</span>
                  </div>
                </div>
                <div class="fx-attr-rows">
                  <div class="fx-arow"><span>Voluntad</span>
                    <span class="fx-num" :class="{ boost: ef.voluntad !== personaje.mente.voluntad }">
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('voluntad', -1)">−</button>
                      <b class="tnum">{{ ef.voluntad }}</b>
                      <button v-if="editAtributos" class="fx-numb" @click="ajustarBono('voluntad', 1)">＋</button>
                    </span>
                  </div>
                  <div class="fx-arow"><span>Pts. hab.</span><b class="tnum">{{ personaje.mente.puntosHabilidadRestantes }}</b></div>
                  <div class="fx-arow"><span>Acc. / Reac.</span><b class="tnum">{{ personaje.acciones }} / {{ personaje.reacciones }}</b></div>
                </div>
              </div>
            </div>
          </div>

          <div class="fx-panel">
            <div class="fx-phead">
              <span class="fx-grow">Armadura / Velocidad</span>
              <button
                v-if="embebido"
                class="fx-gear"
                :class="{ on: editArmadura }"
                title="Ajustar armadura y velocidad (solo en la partida)"
                aria-label="Ajustar armadura y velocidad"
                @click="editArmadura = !editArmadura"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                  />
                </svg>
              </button>
            </div>
            <div class="fx-acspeed">
              <div class="fx-ac">
                <div class="fx-ac-lbl">Armadura</div>
                <div class="fx-shields">
                  <div class="fx-sh l">
                    <span class="fx-sh-cap">L</span>
                    <div class="fx-sh-fig" :class="{ boost: bono('arm_lac') || ef.resistencia !== personaje.cuerpo.resistencia }">
                      <span class="tnum">{{ armaduraTotal.lacerante + bono('arm_lac') }}</span>
                    </div>
                    <div v-if="editArmadura" class="fx-shctrl">
                      <button class="fx-numb" @click="ajustarBono('arm_lac', -1)">−</button>
                      <button class="fx-numb" @click="ajustarBono('arm_lac', 1)">＋</button>
                    </div>
                  </div>
                  <div class="fx-sh p">
                    <span class="fx-sh-cap">P</span>
                    <div class="fx-sh-fig" :class="{ boost: bono('arm_pen') || ef.resistencia !== personaje.cuerpo.resistencia }">
                      <span class="tnum">{{ armaduraTotal.penetrante + bono('arm_pen') }}</span>
                    </div>
                    <div v-if="editArmadura" class="fx-shctrl">
                      <button class="fx-numb" @click="ajustarBono('arm_pen', -1)">−</button>
                      <button class="fx-numb" @click="ajustarBono('arm_pen', 1)">＋</button>
                    </div>
                  </div>
                  <div class="fx-sh c">
                    <span class="fx-sh-cap">C</span>
                    <div class="fx-sh-fig" :class="{ boost: bono('arm_con') || ef.resistencia !== personaje.cuerpo.resistencia }">
                      <span class="tnum">{{ armaduraTotal.contundente + bono('arm_con') }}</span>
                    </div>
                    <div v-if="editArmadura" class="fx-shctrl">
                      <button class="fx-numb" @click="ajustarBono('arm_con', -1)">−</button>
                      <button class="fx-numb" @click="ajustarBono('arm_con', 1)">＋</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fx-sp">
                <div class="fx-ac-lbl">Movimiento</div>
                <div class="fx-sp-val tnum" :class="{ boost: ef.movimiento !== personaje.cuerpo.movimiento }">
                  {{ ef.movimiento }}<small> ecsas</small>
                </div>
                <div v-if="editArmadura" class="fx-shctrl">
                  <button class="fx-numb" @click="ajustarBono('movimiento', -1)">−</button>
                  <button class="fx-numb" @click="ajustarBono('movimiento', 1)">＋</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fila 3: habilidades | combate | dotes+equipo -->
        <div class="fx-row3">
          <!-- Izquierda: habilidades -->
          <div class="fx-stack">
            <div class="fx-panel">
              <div class="fx-phead">
                <span class="fx-grow">Habilidades</span>
                <button class="fx-toggle" @click="mostrarTodas = !mostrarTodas">
                  {{ mostrarTodas ? "Solo competentes" : "Ver todas" }}
                </button>
              </div>
              <div class="fx-skills">
                <div
                  v-for="hab in habilidadesVisibles"
                  :key="hab.nombre"
                  :class="['fx-skill', { comp: hab.competente, dim: !hab.competente, 'fx-usable': embebido }]"
                  @click="usarHabilidad(hab)"
                >
                  <span :class="['fx-prof', { on: hab.competente }]"></span>
                  <span :class="['fx-atag', tagAtributo(hab.atributo).c]">{{
                    tagAtributo(hab.atributo).t
                  }}</span>
                  <span class="fx-sname">{{ hab.nombre }}</span>
                  <span
                    class="fx-sval tnum"
                    :class="{ boost: bonoHabilidad(hab.atributo) }"
                    >{{ formatoMod(hab.total + bonoHabilidad(hab.atributo)) }}</span
                  >
                </div>
                <div v-if="!habilidadesVisibles.length" class="fx-empty">
                  Sin habilidades competentes
                </div>
              </div>
            </div>

            <div class="fx-panel">
              <div class="fx-phead">
                <span class="fx-grow">Armaduras equipadas</span>
                <button
                  class="fx-gear"
                  :class="{ on: configArmadurasAbierto }"
                  @click="configArmadurasAbierto = !configArmadurasAbierto"
                  title="Configurar armaduras"
                  aria-label="Configurar armaduras"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                    />
                  </svg>
                </button>
              </div>
              <div v-if="configArmadurasAbierto" class="fx-cfg">
                <div class="fx-cfg-hint">
                  Muestra, oculta y reordena tus armaduras.
                </div>
                <div v-if="!vistaArmaduras.length" class="fx-cfg-empty">
                  Sin armaduras que configurar.
                </div>
                <div
                  v-for="(v, i) in vistaArmaduras"
                  :key="v.id"
                  class="fx-cfg-row"
                >
                  <div class="fx-cfg-move">
                    <button
                      class="fx-cfg-mb"
                      :disabled="i === 0"
                      @click="moverVista('armaduras', i, -1)"
                      aria-label="Subir"
                    >
                      ▲
                    </button>
                    <button
                      class="fx-cfg-mb"
                      :disabled="i === vistaArmaduras.length - 1"
                      @click="moverVista('armaduras', i, 1)"
                      aria-label="Bajar"
                    >
                      ▼
                    </button>
                  </div>
                  <span class="fx-cfg-name">{{ nombreArmadura(v.id) }}</span>
                  <button
                    class="fx-cfg-eye"
                    :class="{ off: !v.visible }"
                    @click="toggleVista('armaduras', v.id)"
                    :aria-label="v.visible ? 'Ocultar' : 'Mostrar'"
                  >
                    {{ v.visible ? "Visible" : "Oculta" }}
                  </button>
                </div>
              </div>
              <div class="fx-rpad">
                <div
                  v-for="armadura in armadurasVisibles"
                  :key="armadura.id"
                  class="fx-arm"
                >
                  <div class="fx-arm-top">
                    <span class="fx-arm-n">{{ armadura.nombre }}</span>
                    <span
                      v-for="et in armadura.etiquetas"
                      :key="et"
                      class="fx-tag"
                      >{{ et }}</span
                    >
                  </div>
                  <div class="fx-dmgcell">
                    <span class="fx-dchip l tnum">{{ armadura.lac }}</span>
                    <span class="fx-dchip p tnum">{{ armadura.cor }}</span>
                    <span class="fx-dchip c tnum">{{ armadura.con }}</span>
                  </div>
                </div>
                <div v-if="!armadurasVisibles.length" class="fx-empty">
                  Sin armaduras equipadas
                </div>
              </div>
            </div>
          </div>

          <!-- Centro: ataques + activas -->
          <div class="fx-stack">
            <div class="fx-panel fx-panel-atk">
              <div class="fx-sect">
                <span class="fx-grow">Ataques</span>
                <button
                  class="fx-gear"
                  :class="{ on: configArmasAbierto }"
                  @click="configArmasAbierto = !configArmasAbierto"
                  title="Configurar armas"
                  aria-label="Configurar armas"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.4 3.5c0-.3 0-.6-.06-.9l1.7-1.32a.4.4 0 0 0 .1-.52l-1.6-2.77a.4.4 0 0 0-.5-.18l-2 .8a6 6 0 0 0-1.56-.9l-.3-2.13a.4.4 0 0 0-.4-.34h-3.2a.4.4 0 0 0-.4.34l-.3 2.13c-.56.23-1.08.53-1.56.9l-2-.8a.4.4 0 0 0-.5.18l-1.6 2.77a.4.4 0 0 0 .1.52l1.7 1.32c-.04.3-.06.6-.06.9s.02.6.06.9l-1.7 1.32a.4.4 0 0 0-.1.52l1.6 2.77c.1.18.32.25.5.18l2-.8c.48.37 1 .67 1.56.9l.3 2.13c.03.2.2.34.4.34h3.2c.2 0 .37-.14.4-.34l.3-2.13c.56-.23 1.08-.53 1.56-.9l2 .8c.18.07.4 0 .5-.18l1.6-2.77a.4.4 0 0 0-.1-.52l-1.7-1.32c.04-.3.06-.6.06-.9Z"
                    />
                  </svg>
                </button>
              </div>
              <div v-if="configArmasAbierto" class="fx-cfg">
                <div class="fx-cfg-hint">
                  Muestra, oculta y reordena tus armas. "Sin Armas" está siempre
                  disponible.
                </div>
                <div
                  v-for="(v, i) in vistaArmas"
                  :key="v.id"
                  class="fx-cfg-row"
                >
                  <div class="fx-cfg-move">
                    <button
                      class="fx-cfg-mb"
                      :disabled="i === 0"
                      @click="moverVista('armas', i, -1)"
                      aria-label="Subir"
                    >
                      ▲
                    </button>
                    <button
                      class="fx-cfg-mb"
                      :disabled="i === vistaArmas.length - 1"
                      @click="moverVista('armas', i, 1)"
                      aria-label="Bajar"
                    >
                      ▼
                    </button>
                  </div>
                  <span class="fx-cfg-name">{{ nombreArma(v.id) }}</span>
                  <button
                    class="fx-cfg-eye"
                    :class="{ off: !v.visible }"
                    @click="toggleVista('armas', v.id)"
                    :aria-label="v.visible ? 'Ocultar' : 'Mostrar'"
                  >
                    {{ v.visible ? "Visible" : "Oculta" }}
                  </button>
                </div>
              </div>
              <template v-if="armasVisibles.length">
                <div class="fx-atk-head">
                  <span>Arma</span><span>Alcance</span><span>Crítico</span><span>Daño</span>
                </div>
                <div
                  v-for="arma in armasVisibles"
                  :key="arma.id"
                  class="fx-atk-row"
                  :class="{
                    'fx-usable': embebido,
                    'fx-sel': embebido && arma.id === armaSeleccionadaId,
                  }"
                  @click="seleccionarArma(arma)"
                >
                  <div>
                    <div class="fx-atk-name">{{ arma.nombre }}</div>
                    <div class="fx-atk-sub">
                      {{ arma.distancia > 0 ? "A distancia" : "Cuerpo a cuerpo" }}
                    </div>
                    <div v-if="arma.etiquetas.length" class="fx-atk-tags">
                      <span
                        v-for="et in arma.etiquetas"
                        :key="et"
                        class="fx-tag"
                        >{{ et }}</span
                      >
                    </div>
                  </div>
                  <div class="fx-cell">
                    {{ arma.distancia > 0 ? arma.distancia + " ecsas" : "—" }}
                  </div>
                  <div class="fx-cell">
                    ×{{ arma.critico }} · {{ arma.rangoCritico }}
                  </div>
                  <div class="fx-dmgcell">
                    <span
                      class="fx-dchip l tnum"
                      :class="{
                        'fx-dpick': embebido && arma.lac > 0,
                        'fx-dsel':
                          embebido &&
                          arma.id === armaSeleccionadaId &&
                          tipoDanoSeleccionado === 'l',
                      }"
                      @click.stop="seleccionarDano(arma, 'l', arma.lac)"
                      >{{ danoEfectivo(arma.lac) }}</span
                    >
                    <span
                      class="fx-dchip p tnum"
                      :class="{
                        'fx-dpick': embebido && arma.cor > 0,
                        'fx-dsel':
                          embebido &&
                          arma.id === armaSeleccionadaId &&
                          tipoDanoSeleccionado === 'p',
                      }"
                      @click.stop="seleccionarDano(arma, 'p', arma.cor)"
                      >{{ danoEfectivo(arma.cor) }}</span
                    >
                    <span
                      class="fx-dchip c tnum"
                      :class="{
                        'fx-dpick': embebido && arma.con > 0,
                        'fx-dsel':
                          embebido &&
                          arma.id === armaSeleccionadaId &&
                          tipoDanoSeleccionado === 'c',
                      }"
                      @click.stop="seleccionarDano(arma, 'c', arma.con)"
                      >{{ danoEfectivo(arma.con) }}</span
                    >
                  </div>

                  <!-- Desglose del cálculo al pasar el ratón -->
                  <div class="fx-atk-tip" role="tooltip">
                    <div class="fx-tip-title">{{ arma.nombre }}</div>

                    <div class="fx-tip-cap">Daño</div>
                    <div v-if="arma.danos.length" class="fx-tip-dmg">
                      <div
                        v-for="d in arma.danos"
                        :key="d.clase"
                        class="fx-tip-drow"
                      >
                        <span :class="['fx-tip-type', d.clase]">{{
                          d.etiqueta
                        }}</span>
                        <span class="fx-tip-calc tnum">
                          {{ d.base }}<small>arma</small>
                          <span class="fx-tip-op">+</span>
                          {{ d.poderio }}<small>Poderío</small>
                        </span>
                        <span :class="['fx-tip-res', d.clase, 'tnum']">{{
                          d.final
                        }}</span>
                      </div>
                    </div>
                    <div v-else class="fx-tip-none">Sin daño directo</div>

                    <div class="fx-tip-cap">Crítico</div>
                    <div class="fx-tip-crit">
                      <span class="fx-tip-crit-main tnum"
                        >×{{ arma.critico }} · {{ arma.rangoCritico }}</span
                      >
                      <span class="fx-tip-crit-sub">
                        Base 24<template v-if="arma.rangoCritAmpArma">
                          · arma −{{ arma.rangoCritAmpArma }}</template
                        ><template v-if="arma.rangoCritAmpPersonaje">
                          · Rango de crítico −{{
                            arma.rangoCritAmpPersonaje
                          }}</template
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="fx-empty">Sin armas equipadas</div>

              <div class="fx-sect">
                <span class="fx-grow">Habilidades activas</span>
              </div>
              <div
                v-for="activa in personaje.activas"
                :key="activa.nombre"
                :class="['fx-exp', { open: activa.abierto }]"
              >
                <button
                  class="fx-exp-h"
                  @click="activa.abierto = !activa.abierto"
                >
                  <span v-if="activa.diminutivo" class="fx-node">{{
                    activa.diminutivo
                  }}</span>
                  <span class="fx-exp-n">{{ activa.nombre }}</span>
                  <span
                    v-if="embebido && esUsable(activa.tipoEjecucion)"
                    class="fx-use-btn"
                    role="button"
                    title="Usar"
                    @click.stop="usarActiva(activa)"
                    >Usar</span
                  >
                  <span v-if="activa.tipoEjecucion" class="fx-tags">
                    <span
                      :class="['fx-tag', claseEjecucion(activa.tipoEjecucion)]"
                      >{{ labelEjecucion(activa.tipoEjecucion) }}</span
                    >
                    <span
                      v-if="activa.tipoEjecucion === 'accion' && activa.acciones"
                      class="fx-tag fx-tag-acc"
                      >{{ activa.acciones }} acc.</span
                    >
                    <span v-if="activa.tipoAccion" class="fx-tag fx-tag-tipo">{{
                      activa.tipoAccion === "fisica" ? "Física" : "Mental"
                    }}</span>
                  </span>
                  <span
                    v-if="activa.mejoras.length"
                    class="fx-cost"
                    :title="activa.mejoras.length + ' mejora(s)'"
                    >★ {{ activa.mejoras.length }}</span
                  >
                  <svg class="fx-chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div v-if="activa.abierto" class="fx-exp-b">
                  <p class="fx-exp-d">{{ activa.descripcion }}</p>
                  <div v-if="activa.mejoras.length" class="fx-mejoras">
                    <div
                      v-for="m in activa.mejoras"
                      :key="m.nombre"
                      class="fx-mejora"
                    >
                      <span class="fx-mejora-l">Mejora</span>
                      <div>
                        <div class="fx-mejora-n">
                          {{ m.nombre }}
                          <span v-if="m.tipoEjecucion" class="fx-tags">
                            <span
                              :class="['fx-tag', claseEjecucion(m.tipoEjecucion)]"
                              >{{ labelEjecucion(m.tipoEjecucion) }}</span
                            >
                            <span
                              v-if="m.tipoEjecucion === 'accion' && m.acciones"
                              class="fx-tag fx-tag-acc"
                              >{{ m.acciones }} acc.</span
                            >
                            <span
                              v-if="m.tipoAccion"
                              class="fx-tag fx-tag-tipo"
                              >{{
                                m.tipoAccion === "fisica" ? "Física" : "Mental"
                              }}</span
                            >
                          </span>
                        </div>
                        <div class="fx-mejora-d">{{ m.descripcion }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!personaje.activas.length" class="fx-empty">
                Sin habilidades activas
              </div>
            </div>

            <!-- Botón de ataque (fuera del apartado de ataque) -->
            <button
              v-if="embebido && armasVisibles.length"
              class="fx-attack-btn"
              :disabled="!puedeAtacar"
              @click="confirmarAtaque"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.92 5H5l9 9 1.42-1.42L6.92 5Zm9.66-1 2.83 2.83-3.54 3.54 1.42 1.41 1.4-1.4 1.42 1.4L21 11l-1.42-1.42L21 8.17 16.58 3.75 15.17 5.17 16.58 4ZM3 17.25V21h3.75l9.06-9.06-3.75-3.75L3 17.25Z"
                />
              </svg>
              <span>Atacar</span>
            </button>

            <!-- Ventaja / Desventaja: afecta a todas las tiradas de la ficha -->
            <div
              v-if="embebido"
              class="fx-adv"
              :class="{ adv: ventajaTirada > 0, dis: ventajaTirada < 0 }"
            >
              <button
                type="button"
                class="fx-adv-b dis"
                title="Añadir desventaja"
                @click="ajustarVentaja(-1)"
              >
                −
              </button>
              <button
                type="button"
                class="fx-adv-lbl"
                title="Reiniciar a Normal"
                @click="reiniciarVentaja"
              >
                {{ textoVentaja }}
              </button>
              <button
                type="button"
                class="fx-adv-b adv"
                title="Añadir ventaja"
                @click="ajustarVentaja(1)"
              >
                ＋
              </button>
            </div>
          </div>

          <!-- Derecha: innatas + dotes -->
          <div class="fx-stack">
            <!-- Innatas -->
            <div class="fx-panel">
              <div class="fx-phead">Innatas</div>
              <div class="fx-rpad">
                <div
                  v-for="innata in personaje.innatas"
                  :key="'inn-' + innata.nombre"
                  :class="['fx-exp', { open: innata.abierto }]"
                >
                  <button
                    class="fx-exp-h"
                    @click="innata.abierto = !innata.abierto"
                  >
                    <span class="fx-exp-n">{{ innata.nombre }}</span>
                    <span
                      v-if="embebido && esUsable(innata.tipoEjecucion)"
                      class="fx-use-btn"
                      role="button"
                      title="Usar"
                      @click.stop="usarActiva(innata)"
                      >Usar</span
                    >
                    <span v-if="innata.tipoEjecucion" class="fx-tags">
                      <span
                        :class="['fx-tag', claseEjecucion(innata.tipoEjecucion)]"
                        >{{ labelEjecucion(innata.tipoEjecucion) }}</span
                      >
                      <span
                        v-if="
                          innata.tipoEjecucion === 'accion' && innata.acciones
                        "
                        class="fx-tag fx-tag-acc"
                        >{{ innata.acciones }} acc.</span
                      >
                      <span
                        v-if="innata.tipoAccion"
                        class="fx-tag fx-tag-tipo"
                        >{{
                          innata.tipoAccion === "fisica" ? "Física" : "Mental"
                        }}</span
                      >
                    </span>
                    <svg class="fx-chev" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div v-if="innata.abierto" class="fx-exp-b">
                    <p class="fx-exp-d">{{ innata.descripcion }}</p>
                    <template
                      v-for="(bloque, bi) in innata.bloques || []"
                      :key="bi"
                    >
                      <!-- Bloque: lista de puntos -->
                      <div v-if="bloque.tipo === 'puntos'" class="fx-bloque">
                        <div v-if="bloque.titulo" class="fx-bloque-t">
                          {{ bloque.titulo }}
                        </div>
                        <ul class="fx-lista">
                          <li v-for="(it, ii) in bloque.items" :key="ii">
                            {{ it }}
                          </li>
                        </ul>
                      </div>
                      <!-- Bloque: tabla -->
                      <div
                        v-else-if="bloque.tipo === 'tabla'"
                        class="fx-bloque"
                      >
                        <div v-if="bloque.titulo" class="fx-bloque-t">
                          {{ bloque.titulo }}
                        </div>
                        <div class="fx-tabla-wrap">
                          <table class="fx-tabla">
                            <thead>
                              <tr>
                                <th
                                  v-for="(c, ci) in bloque.cabeceras"
                                  :key="ci"
                                >
                                  {{ c }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(fila, fi) in bloque.filas" :key="fi">
                                <td
                                  v-for="(celda, cdi) in fila"
                                  :key="cdi"
                                >
                                  {{ celda }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- Bloque: contador -->
                      <div
                        v-else-if="bloque.tipo === 'contador'"
                        class="fx-bloque"
                      >
                        <div class="fx-contador">
                          <span class="fx-contador-l">{{ bloque.titulo }}</span>
                          <div class="fx-contador-ctrl">
                            <button
                              class="fx-contador-b"
                              @click="ajustarContador(bloque.clave || '', -1)"
                              aria-label="Restar"
                            >
                              −
                            </button>
                            <span class="fx-contador-v">{{
                              contadores[bloque.clave || ""] ?? 0
                            }}</span>
                            <button
                              class="fx-contador-b"
                              @click="ajustarContador(bloque.clave || '', 1)"
                              aria-label="Sumar"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-if="!personaje.innatas.length" class="fx-empty">
                  Sin innatas
                </div>
              </div>
            </div>

            <!-- Dotes -->
            <div class="fx-panel">
              <div class="fx-phead">Dotes</div>
              <div class="fx-rpad">
                <template v-if="personaje.dotesEspecialidad.length">
                  <div class="fx-feat-src">Especialidad</div>
                  <div
                    v-for="dote in personaje.dotesEspecialidad"
                    :key="'esp-' + dote.nombre"
                    :class="['fx-exp', { open: dote.abierto }]"
                  >
                    <button
                      class="fx-exp-h"
                      @click="dote.abierto = !dote.abierto"
                    >
                      <span class="fx-exp-n">{{ dote.nombre }}</span>
                      <svg class="fx-chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div v-if="dote.abierto" class="fx-exp-b">
                      <p class="fx-exp-d">{{ dote.descripcion }}</p>
                    </div>
                  </div>
                </template>
                <template v-if="personaje.dotesEstilo.length">
                  <div class="fx-feat-src">Estilo marcial</div>
                  <div
                    v-for="dote in personaje.dotesEstilo"
                    :key="'est-' + dote.nombre"
                    :class="['fx-exp', { open: dote.abierto }]"
                  >
                    <button
                      class="fx-exp-h"
                      @click="dote.abierto = !dote.abierto"
                    >
                      <span class="fx-exp-n">{{ dote.nombre }}</span>
                      <span
                        v-if="embebido && esUsable(dote.tipoEjecucion)"
                        class="fx-use-btn"
                        role="button"
                        title="Usar"
                        @click.stop="usarActiva(dote)"
                        >Usar</span
                      >
                      <span v-if="dote.tipoEjecucion" class="fx-tags">
                        <span
                          :class="['fx-tag', claseEjecucion(dote.tipoEjecucion)]"
                          >{{ labelEjecucion(dote.tipoEjecucion) }}</span
                        >
                        <span
                          v-if="dote.tipoEjecucion === 'accion' && dote.acciones"
                          class="fx-tag fx-tag-acc"
                          >{{ dote.acciones }} acc.</span
                        >
                        <span
                          v-if="dote.tipoAccion"
                          class="fx-tag fx-tag-tipo"
                          >{{
                            dote.tipoAccion === "fisica" ? "Física" : "Mental"
                          }}</span
                        >
                      </span>
                      <svg class="fx-chev" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div v-if="dote.abierto" class="fx-exp-b">
                      <p class="fx-exp-d">{{ dote.descripcion }}</p>
                    </div>
                  </div>
                </template>
                <div
                  v-if="
                    !personaje.dotesEspecialidad.length &&
                    !personaje.dotesEstilo.length
                  "
                  class="fx-empty"
                >
                  Sin dotes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= ÁRBOL ================= -->
      <div v-else-if="currentTab === 'arbol'" class="fx-panel fx-tabpad">
        <Arbol
          v-if="personajeGuardado"
          :arbol-data="personajeGuardado.arbol || '[]'"
        />
        <div v-else class="empty-state">
          <p class="empty-title">Cargando árbol...</p>
        </div>
      </div>

      <!-- ================= INVENTARIO ================= -->
      <div v-else class="fx-panel fx-tabpad">
        <div class="empty-state">
          <p class="empty-title">Vista de inventario</p>
          <p class="empty-hint">Contenido próximamente...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";
import armasData from "../../assets/armas.json";
import armadurasData from "../../assets/armaduras.json";
import especialidadesData from "../../assets/especialidades/especialidades.json";
import estilosMarciales from "../../assets/estiloMarcial/estiloMarcial.json";
import activasData from "../../assets/activas.json";
import arbolData from "../../assets/arbol.json";
import habilidadesData from "../../assets/habilidades.json";
import Arbol from "./arbol.vue";
import type { PersonajeGuardado, VistaEquipo } from "../../domain/Personaje";
import { ID_SIN_ARMAS } from "../../domain/Personaje";
import {
  obtenerPersonaje,
  guardarPersonaje,
} from "../../domain/storage/personajesRepo";
import { tirar2d12, etiquetaVentaja } from "../../domain/dados";
import { usePartida } from "../../domain/usePartida";
import type { PayloadTirada } from "../../domain/usePartida";
import { useAjusteEscala } from "../../domain/useAjusteEscala";

// Escala la ficha (ancho de diseño 1280) para que quepa en pantallas pequeñas
// o en la ventana flotante del juego.
const { contenedor, zoom } = useAjusteEscala(1280);

const props = defineProps<{
  characterId?: string;
  // Datos del personaje inyectados directamente (p. ej. una instancia de
  // partida). Si se pasa, se usan en lugar de cargar desde el repositorio.
  personajeExterno?: any;
  // Modo embebido (ficha flotante en la escena de juego): oculta la barra
  // superior de navegación, no persiste cambios en el repositorio y hace
  // interactivos habilidades/ataques/activas (emiten "usar").
  embebido?: boolean;
}>();

// En modo embebido, al pulsar una habilidad / ataque / activa / iniciativa se
// emite "tirar" con la tirada resuelta (o la acción usada) lista para el chat.
const emit = defineEmits<{ (e: "tirar", payload: PayloadTirada): void }>();

// --- Ventaja / Desventaja (global a todas las tiradas de esta ficha) ---
// Un único entero: >0 ventaja ×N, <0 desventaja ×N, 0 normal. Son excluyentes
// y acumulables, así que incrementar una reduce la otra de forma natural.
const ventajaTirada = ref(0);
function ajustarVentaja(delta: number) {
  ventajaTirada.value = Math.max(-6, Math.min(6, ventajaTirada.value + delta));
}
function reiniciarVentaja() {
  ventajaTirada.value = 0;
}
const textoVentaja = computed(() => etiquetaVentaja(ventajaTirada.value));

// --- Bonos temporales de partida (solo modo embebido) ---
// Suben valores durante el juego SIN persistirse ni afectar a la ficha de
// VerPersonaje. Se guardan por clave (atributo/armadura/vida…) y son >= 0.
// El objeto se toma del estado de la partida (bonosDeFicha) para que sobreviva
// al cerrar y reabrir la ventana flotante; en modo no embebido es local.
const { bonosDeFicha } = usePartida();
const bonos = ref<Record<string, number>>({});
function bono(clave: string): number {
  return bonos.value[clave] || 0;
}
function ajustarBono(clave: string, delta: number) {
  const nuevo = Math.max(0, (bonos.value[clave] || 0) + delta);
  if (nuevo === 0) delete bonos.value[clave];
  else bonos.value[clave] = nuevo;
}
// Fija un bono a un valor exacto (desde un campo numérico). Nunca negativo.
function fijarBono(clave: string, valor: string | number) {
  const nuevo = Math.max(0, Math.floor(Number(valor) || 0));
  if (nuevo === 0) delete bonos.value[clave];
  else bonos.value[clave] = nuevo;
}
// Interruptores del modo edición de cada panel.
const editAtributos = ref(false);
const editArmadura = ref(false);
const editVida = ref(false);

// Valores EFECTIVOS = base + bono propio + cascada del atributo principal.
// Reglas del juego: cada punto de Cuerpo suma +1 a Poderío / Movimiento /
// Resistencia; cada punto de Agilidad suma +3 a Evasión / Iniciativa / Deadeye.
// El daño de un arma es (daño base + Poderío), así que sube con el Poderío.
const ef = computed(() => {
  const p = personaje.value;
  const bc = bono("cuerpo");
  const ba = bono("agilidad");
  const bm = bono("mente");
  return {
    cuerpo: p.cuerpo.total + bc,
    agilidad: p.agilidad.total + ba,
    mente: p.mente.total + bm,
    poderio: p.cuerpo.poderio + bono("poderio") + bc,
    movimiento: p.cuerpo.movimiento + bono("movimiento") + bc,
    resistencia: p.cuerpo.resistencia + bono("resistencia") + bc,
    esquiva: p.agilidad.esquiva + bono("esquiva") + ba * 3,
    iniciativa: p.agilidad.iniciativa + bono("iniciativa") + ba * 3,
    deadeye: p.agilidad.deadeye + bono("deadeye") + ba * 3,
    voluntad: p.mente.voluntad + bono("voluntad"),
    // Incremento de daño = incremento de Poderío (propio + cascada de Cuerpo).
    poderioDelta: bono("poderio") + bc,
  };
});

// Bono del atributo principal que se aplica a una habilidad (2d12 + atributo + …).
function bonoHabilidad(atributo?: string): number {
  if (atributo === "Cuerpo") return bono("cuerpo");
  if (atributo === "Agilidad") return bono("agilidad");
  return bono("mente"); // Mente / Artesanía / Recolección
}

// Daño efectivo de un tipo: solo se aplica a tipos que el arma inflige (base > 0).
function danoEfectivo(valor: number): number {
  return valor > 0 ? valor + ef.value.poderioDelta : 0;
}

// Colores de acento por atributo / tipo de daño (para resaltar en el chat).
const COLOR_ATRIBUTO: Record<string, string> = {
  Cuerpo: "#d81f4a",
  Agilidad: "#0e9488",
  Mente: "#6d5ae6",
};
function colorAtributo(attr?: string): string {
  return (attr && COLOR_ATRIBUTO[attr]) || "#6d5ae6";
}

function usarHabilidad(hab: { nombre: string; total: number; atributo?: string }) {
  if (!props.embebido) return;
  const total = hab.total + bonoHabilidad(hab.atributo);
  const tirada = tirar2d12(total, hab.nombre, ventajaTirada.value);
  emit("tirar", {
    texto: `usa ${hab.nombre}`,
    tirada,
    color: colorAtributo(hab.atributo),
  });
}

function usarIniciativa() {
  if (!props.embebido) return;
  const tirada = tirar2d12(
    ef.value.iniciativa,
    "Iniciativa",
    ventajaTirada.value,
  );
  emit("tirar", {
    texto: "tira Iniciativa",
    tirada,
    color: COLOR_ATRIBUTO.Agilidad,
  });
}

// --- Selección de ataque (modo embebido) ---
// El jugador elige un arma y uno de sus 3 tipos de daño; el ataque solo se
// vuelca al chat al pulsar el botón "Atacar".
type TipoDano = "l" | "p" | "c";
const armaSeleccionadaId = ref<number | null>(null);
const tipoDanoSeleccionado = ref<TipoDano | null>(null);

function seleccionarArma(arma: { id: number }) {
  if (!props.embebido) return;
  if (armaSeleccionadaId.value !== arma.id) {
    armaSeleccionadaId.value = arma.id;
    // Al cambiar de arma, el tipo de daño elegido deja de ser válido.
    tipoDanoSeleccionado.value = null;
  }
}

function seleccionarDano(arma: { id: number }, tipo: TipoDano, valor: number) {
  if (!props.embebido) return;
  armaSeleccionadaId.value = arma.id;
  if (valor > 0) tipoDanoSeleccionado.value = tipo;
}

const armaSeleccionada = computed(
  () => armasVisibles.value.find((a) => a.id === armaSeleccionadaId.value) || null,
);

const puedeAtacar = computed(
  () => !!armaSeleccionada.value && !!tipoDanoSeleccionado.value,
);

function etiquetaDano(tipo: TipoDano) {
  return tipo === "l" ? "lacerante" : tipo === "p" ? "perforante" : "contundente";
}

function valorDano(arma: any, tipo: TipoDano) {
  return tipo === "l" ? arma.lac : tipo === "p" ? arma.cor : arma.con;
}

const COLOR_DANO: Record<TipoDano, string> = {
  l: "#d8365f",
  p: "#2f7fd8",
  c: "#cc7d10",
};

// Ataque: para golpear se tira 2d12 + nivel; el daño es plano (arma + Poderío,
// ya calculado en arma.lac/cor/con).
function confirmarAtaque() {
  if (!props.embebido || !armaSeleccionada.value || !tipoDanoSeleccionado.value)
    return;
  const arma = armaSeleccionada.value;
  const tipo = tipoDanoSeleccionado.value;
  const tirada = tirar2d12(personaje.value.nivel, "Nivel", ventajaTirada.value);
  emit("tirar", {
    texto: `ataca con ${arma.nombre}`,
    tirada,
    dano: `${danoEfectivo(valorDano(arma, tipo))} ${etiquetaDano(tipo)}`,
    danoColor: COLOR_DANO[tipo],
    color: COLOR_DANO[tipo],
  });
}

// Solo las acciones y reacciones se pueden "usar" (volcar al chat); las pasivas
// y rituales se muestran pero no son clicables.
function esUsable(tipo?: string): boolean {
  return tipo === "accion" || tipo === "reaccion";
}

// Las activas/innatas de tipo acción o reacción no tiran dados: vuelcan su
// nombre y descripción al chat.
function usarActiva(activa: {
  nombre: string;
  descripcion?: string;
  tipoEjecucion?: string;
}) {
  if (!props.embebido) return;
  emit("tirar", {
    texto: `usa ${activa.nombre}`,
    descripcion: activa.descripcion,
    tipoEjecucion: activa.tipoEjecucion,
    color: activa.tipoEjecucion === "reaccion" ? "#cc7d10" : "#4f46e5",
  });
}

// Estado para controlar la pestaña activa
const currentTab = ref<"ficha" | "arbol" | "inventario">("ficha");

// Filtro de habilidades
const mostrarTodas = ref(false);

// --- Configuración de visualización de armas / armaduras en la ficha ---
// "Disponibles" son todos los objetos que el personaje puede mostrar (armas
// equipadas + la pseudo-arma "Sin Armas"); "vista" define su orden y qué se ve.
const armasDisponibles = ref<any[]>([]);
const armadurasDisponibles = ref<any[]>([]);
const vistaArmas = ref<VistaEquipo[]>([]);
const vistaArmaduras = ref<VistaEquipo[]>([]);
const configArmasAbierto = ref(false);
const configArmadurasAbierto = ref(false);

// Inject navigation function from App.vue
const navigateToCharacters = inject<() => void>("navigateToCharacters");
const navigateToEditarPersonaje = inject<(id: string) => void>(
  "navigateToEditarPersonaje",
);
const navigateToSubirNivel = inject<(id: string) => void>(
  "navigateToSubirNivel",
);

function volver() {
  if (navigateToCharacters) {
    navigateToCharacters();
  }
}

function editar() {
  if (props.characterId) {
    navigateToEditarPersonaje?.(props.characterId);
  }
}

function subirNivel() {
  if (props.characterId) {
    navigateToSubirNivel?.(props.characterId);
  }
}

// Formatea un modificador con signo (+3, -1, +0)
function formatoMod(valor: number): string {
  return (valor >= 0 ? "+" : "") + valor;
}

// Combina el rango de crítico propio del arma con el "Rango de Crítico" del
// personaje. En un d24 se acierta crítico desde un umbral hacia arriba (24 base).
// Tanto el arma como el personaje AMPLÍAN el rango (bajan el umbral); aquí se
// suman ambas ampliaciones para obtener el umbral final del personaje con esa arma.
function calcularRangoCritico(
  rangoArma: string | null,
  rangoPersonaje: number,
): { texto: string; umbral: number; ampArma: number; ampPersonaje: number } {
  const BASE = 24;
  // El personaje guarda ya el umbral (24 base, menos por nodos de Rango de Crítico)
  const ampPersonaje = Math.max(0, BASE - (rangoPersonaje || BASE));
  // El arma trae un rango tipo "23-24"; su extremo inferior marca su ampliación
  let ampArma = 0;
  if (rangoArma) {
    const low = parseInt(String(rangoArma).split("-")[0]);
    if (!isNaN(low)) ampArma = Math.max(0, BASE - low);
  }
  const umbral = Math.max(2, BASE - ampPersonaje - ampArma);
  const texto = umbral >= BASE ? String(BASE) : `${umbral}-${BASE}`;
  return { texto, umbral, ampArma, ampPersonaje };
}

// Etiqueta corta y clase de color según el atributo de la habilidad
function tagAtributo(atributo: string): { t: string; c: string } {
  if (atributo === "Cuerpo") return { t: "CUE", c: "cu" };
  if (atributo === "Agilidad") return { t: "AGI", c: "ag" };
  return { t: "MEN", c: "me" }; // Mente, Artesania, Recoleccion
}

// Datos cargados del almacén del navegador
const personajeGuardado = ref<PersonajeGuardado | null>(null);

// Contadores persistentes declarados por las innatas (p. ej. arma predilecta)
const contadores = ref<Record<string, number>>({});

// Ajusta un contador (mínimo 0) y lo persiste en el personaje guardado
async function ajustarContador(clave: string, delta: number) {
  const valor = Math.max(0, (contadores.value[clave] ?? 0) + delta);
  contadores.value[clave] = valor;
  if (personajeGuardado.value) {
    (personajeGuardado.value as any)[clave] = valor;
    // En modo embebido no se persiste (no debe alterar el personaje base).
    if (!props.embebido) await guardarPersonaje(personajeGuardado.value);
  }
}

// Objeto del personaje formateado para la UI
const personaje = ref({
  nombre: "",
  nivel: 1,
  trasfondo: "",
  especialidad: "",
  estiloMarcial: "",

  hp: {
    actual: 0,
    maximo: 0,
  },

  cuerpo: {
    total: 0,
    poderio: 0,
    movimiento: 0,
    resistencia: 0,
  },

  agilidad: {
    total: 0,
    esquiva: 0,
    iniciativa: 0,
    deadeye: 0,
  },

  mente: {
    total: 0,
    voluntad: 0,
    puntosHabilidadRestantes: 0,
  },

  acciones: 0,
  reacciones: 0,

  innatas: [] as Array<{
    nombre: string;
    descripcion: string;
    abierto: boolean;
    tipoEjecucion?: string;
    tipoAccion?: string;
    acciones?: number;
    bloques?: Array<{
      tipo: string;
      titulo?: string;
      items?: string[];
      cabeceras?: string[];
      filas?: string[][];
      clave?: string;
    }>;
  }>,
  dotesEspecialidad: [] as Array<{
    nombre: string;
    descripcion: string;
    abierto: boolean;
  }>,
  dotesEstilo: [] as Array<{
    nombre: string;
    descripcion: string;
    abierto: boolean;
    tipoEjecucion?: string;
    tipoAccion?: string;
    acciones?: number;
  }>,
  activas: [] as Array<{
    nombre: string;
    descripcion: string;
    diminutivo: string;
    abierto: boolean;
    tipoEjecucion?: string;
    tipoAccion?: string;
    acciones?: number;
    mejoras: Array<{
      nombre: string;
      descripcion: string;
      tipoEjecucion?: string;
      tipoAccion?: string;
      acciones?: number;
    }>;
  }>,
  habilidades: [] as Array<{
    nombre: string;
    competente: boolean;
    total: number;
    atributo: string;
  }>,
  armas: [] as Array<any>,
  armaduras: [] as Array<any>,
});

// Etiqueta legible del tipo de ejecución (acción/reacción/pasiva/ritual).
function labelEjecucion(tipo?: string): string {
  switch (tipo) {
    case "accion":
      return "Acción";
    case "reaccion":
      return "Reacción";
    case "ritual":
      return "Ritual";
    case "pasiva":
      return "Pasiva";
    default:
      return tipo ?? "";
  }
}

// Clase de color del tag según el tipo de ejecución.
function claseEjecucion(tipo?: string): string {
  switch (tipo) {
    case "reaccion":
      return "fx-tag-reaccion";
    case "ritual":
      return "fx-tag-ritual";
    case "pasiva":
      return "fx-tag-pasiva";
    default:
      return "fx-tag-accion";
  }
}

// Porcentaje de vida para la barra
const hpPct = computed(() => {
  // El bono de vida cuenta como vida real: se suma a actual y máximo.
  const b = bono("hp");
  const max = personaje.value.hp.maximo + b || 1;
  const actual = personaje.value.hp.actual + b;
  return Math.max(0, Math.min(100, Math.round((actual / max) * 100)));
});

// Habilidades ordenadas (competentes primero, luego por total) y filtradas
const habilidadesOrdenadas = computed(() =>
  [...personaje.value.habilidades].sort(
    (a, b) =>
      Number(b.competente) - Number(a.competente) || b.total - a.total,
  ),
);
const habilidadesVisibles = computed(() =>
  mostrarTodas.value
    ? habilidadesOrdenadas.value
    : habilidadesOrdenadas.value.filter((h) => h.competente),
);

// Armas / armaduras a mostrar, en el orden y con la visibilidad configurados
const armasVisibles = computed(() =>
  vistaArmas.value
    .filter((v) => v.visible)
    .map((v) => armasDisponibles.value.find((a) => a.id === v.id))
    .filter((a): a is any => Boolean(a)),
);
const armadurasVisibles = computed(() =>
  vistaArmaduras.value
    .filter((v) => v.visible)
    .map((v) => armadurasDisponibles.value.find((a) => a.id === v.id))
    .filter((a): a is any => Boolean(a)),
);

// Armadura total (resistencia EFECTIVA + armaduras VISIBLES). Al usar la
// resistencia efectiva, subir Cuerpo o Resistencia se refleja aquí también.
const armaduraTotal = computed(() => {
  const r = ef.value.resistencia;
  const total = { lacerante: r, penetrante: r, contundente: r };
  for (const a of armadurasVisibles.value) {
    total.lacerante += a.lac;
    total.penetrante += a.cor;
    total.contundente += a.con;
  }
  return total;
});

// Nombre legible de un arma/armadura por id (para el panel de configuración)
function nombreArma(id: number): string {
  return armasDisponibles.value.find((a) => a.id === id)?.nombre || "—";
}
function nombreArmadura(id: number): string {
  return armadurasDisponibles.value.find((a) => a.id === id)?.nombre || "—";
}

// Reconstruye una configuración de vista respetando el orden guardado, quitando
// los ids que ya no existen y añadiendo los nuevos al final con su visibilidad
// por defecto.
function construirVista(
  disponiblesIds: number[],
  guardada: VistaEquipo[] | undefined,
  visiblePorDefecto: (id: number) => boolean,
): VistaEquipo[] {
  const resultado: VistaEquipo[] = [];
  const vistos = new Set<number>();
  for (const v of guardada || []) {
    if (disponiblesIds.includes(v.id) && !vistos.has(v.id)) {
      resultado.push({ id: v.id, visible: v.visible });
      vistos.add(v.id);
    }
  }
  for (const id of disponiblesIds) {
    if (!vistos.has(id)) {
      resultado.push({ id, visible: visiblePorDefecto(id) });
      vistos.add(id);
    }
  }
  return resultado;
}

// Persiste el orden/visibilidad de armas y armaduras en el personaje guardado
function persistirVistas() {
  if (!personajeGuardado.value) return;
  personajeGuardado.value.armas_vista = vistaArmas.value.map((v) => ({ ...v }));
  personajeGuardado.value.armaduras_vista = vistaArmaduras.value.map((v) => ({
    ...v,
  }));
  if (!props.embebido) guardarPersonaje(personajeGuardado.value);
}

function toggleVista(tipo: "armas" | "armaduras", id: number) {
  const arr = (tipo === "armas" ? vistaArmas : vistaArmaduras).value;
  const item = arr.find((v) => v.id === id);
  if (!item) return;
  item.visible = !item.visible;
  persistirVistas();
}

function moverVista(tipo: "armas" | "armaduras", index: number, dir: number) {
  const arr = (tipo === "armas" ? vistaArmas : vistaArmaduras).value;
  const j = index + dir;
  if (j < 0 || j >= arr.length) return;
  const tmp = arr[index];
  arr[index] = arr[j];
  arr[j] = tmp;
  persistirVistas();
}

// Función para cargar el personaje desde el almacén del navegador
async function cargarPersonaje() {
  try {
    // Prioridad: datos inyectados (instancia de partida) > repositorio por id.
    const datos =
      props.personajeExterno ??
      (props.characterId ? await obtenerPersonaje(props.characterId) : null);

    if (!props.personajeExterno && !props.characterId) {
      console.warn("No se proporcionó ID de personaje para cargar la ficha.");
      return;
    }

    if (!datos) {
      console.warn(
        `No se encontró personaje guardado con ID: ${props.characterId}`,
      );
      return;
    }

    personajeGuardado.value = datos;

    // Información básica
    personaje.value.nombre = datos.nombre || "";
    personaje.value.nivel = datos.nivel || 1;
    personaje.value.trasfondo = datos.trasfondo || "";
    personaje.value.especialidad = datos.especialidad || "";
    personaje.value.estiloMarcial = datos.estilo_marcial || "";

    // HP
    personaje.value.hp.maximo = datos.atributos?.hp || 10;
    personaje.value.hp.actual = datos.atributos?.hp || 10; // Por defecto, vida completa

    // Atributos - Cuerpo
    personaje.value.cuerpo.total = datos.atributos?.cuerpo || 0;
    personaje.value.cuerpo.poderio = datos.atributos?.poderio || 0;
    personaje.value.cuerpo.movimiento = datos.atributos?.movimiento || 3;
    personaje.value.cuerpo.resistencia = datos.atributos?.resistencia || 0;

    // Atributos - Agilidad
    personaje.value.agilidad.total = datos.atributos?.agilidad || 0;
    personaje.value.agilidad.esquiva = datos.atributos?.evasion || 12;
    personaje.value.agilidad.iniciativa = datos.atributos?.iniciativa || 0;
    personaje.value.agilidad.deadeye = datos.atributos?.punteria || 0;

    // Atributos - Mente
    personaje.value.mente.total = datos.atributos?.mente || 0;
    personaje.value.mente.voluntad = datos.atributos?.regeneracion || 2;
    personaje.value.mente.puntosHabilidadRestantes =
      datos.atributos?.puntosHabilidad || 10;

    // Acciones y Reacciones
    personaje.value.acciones = datos.atributos?.acciones || 0;
    personaje.value.reacciones = datos.atributos?.reacciones || 0;

    // Cargar dotes de especialidad
    if (datos.especialidad) {
      const especialidad = especialidadesData.especialidades.find((o) => o.nombre === datos.especialidad);
      if (especialidad && datos.especialidad_dotes) {
        console.log("Dotes de especialidad guardadas:", datos.especialidad_dotes);

        personaje.value.dotesEspecialidad = datos.especialidad_dotes.map(
          (doteId: number) => {
            const dote = especialidad.dotes.find((d: any) => d.id === doteId);
            if (dote) {
              return {
                nombre: dote.nombre,
                descripcion: dote.descripcion,
                abierto: false,
              };
            }
            return {
              nombre: `Dote ID: ${doteId}`,
              descripcion: "Descripción no disponible",
              abierto: false,
            };
          },
        );

        console.log("Dotes de especialidad cargadas:", personaje.value.dotesEspecialidad);
      } else if (especialidad) {
        // Si no hay dotes guardadas, mostrar todas las dotes del especialidad (comportamiento legacy)
        personaje.value.dotesEspecialidad = especialidad.dotes.map((dote) => ({
          nombre: dote.nombre,
          descripcion: dote.descripcion,
          abierto: false,
        }));
      }
    }

    // Mejoras de activas aportadas por dotes de estilo marcial.
    // Clave = id de la activa (string); valor = lista de mejoras.
    const mejorasPorActiva: Record<
      string,
      Array<{
        nombre: string;
        descripcion: string;
        tipoEjecucion?: string;
        tipoAccion?: string;
        acciones?: number;
      }>
    > = {};

    // Cargar dotes de estilo marcial
    if (datos.estilo_marcial) {
      const estilo = estilosMarciales.estiloMarcial.find(
        (e: any) => e.nombre === datos.estilo_marcial,
      );

      // Cargar innatas del estilo marcial e inicializar sus contadores
      if (estilo && (estilo as any).innatas) {
        personaje.value.innatas = ((estilo as any).innatas as any[]).map(
          (inn) => ({
            nombre: inn.nombre,
            descripcion: inn.descripcion,
            abierto: false,
            tipoEjecucion: inn.tipoEjecucion,
            tipoAccion: inn.tipoAccion,
            acciones: inn.acciones,
            bloques: inn.bloques,
          }),
        );
        for (const inn of (estilo as any).innatas as any[]) {
          for (const bloque of inn.bloques || []) {
            if (bloque.tipo === "contador" && bloque.clave) {
              contadores.value[bloque.clave] = (datos as any)[bloque.clave] ?? 0;
            }
          }
        }
      }

      if (estilo && datos.estilo_marcial_dotes) {
        console.log("Dotes guardadas:", datos.estilo_marcial_dotes);
        console.log("Estilo encontrado:", estilo.nombre);

        const dotesEstiloPuras: Array<{
          nombre: string;
          descripcion: string;
          abierto: boolean;
          tipoEjecucion?: string;
          tipoAccion?: string;
          acciones?: number;
        }> = [];

        datos.estilo_marcial_dotes.forEach((doteId: string) => {
          // Extraer el número del ID (formato: "EstiloMarcial_123" -> 123)
          const partes = doteId.split("_");
          const idNumerico =
            partes.length > 1 && partes[1]
              ? parseInt(partes[1])
              : parseInt(doteId);

          // Buscar la dote por ID en el estilo marcial actual
          const dote = estilo.dotes.find((d: any) => d.id === idNumerico);

          if (!dote) {
            console.warn(
              `Dote no encontrada para ID: ${doteId} (numérico: ${idNumerico})`,
            );
            dotesEstiloPuras.push({
              nombre: `Dote ID: ${doteId}`,
              descripcion: "Descripción no disponible",
              abierto: false,
            });
            return;
          }

          console.log(`Dote encontrada: ${dote.nombre} (ID: ${idNumerico})`);

          // Si la dote mejora una activa (campo "activa" con id), se guarda
          // como mejora para mostrarla dentro de esa activa; si no, es una
          // dote pasiva normal.
          const activaId = (dote as any).activa;
          if (activaId) {
            (mejorasPorActiva[activaId] ??= []).push({
              nombre: dote.nombre,
              descripcion: dote.descripcion,
              tipoEjecucion: (dote as any).tipoEjecucion,
              tipoAccion: (dote as any).tipoAccion,
              acciones: (dote as any).acciones,
            });
          } else {
            dotesEstiloPuras.push({
              nombre: dote.nombre,
              descripcion: dote.descripcion,
              abierto: false,
              tipoEjecucion: (dote as any).tipoEjecucion,
              tipoAccion: (dote as any).tipoAccion,
              acciones: (dote as any).acciones,
            });
          }
        });

        personaje.value.dotesEstilo = dotesEstiloPuras;

        console.log("Dotes de estilo cargadas:", personaje.value.dotesEstilo);
        console.log("Mejoras de activas:", mejorasPorActiva);
      }
    }

    // Cargar activas desde el árbol
    if (datos.arbol) {
      try {
        const nodosArbol = JSON.parse(datos.arbol);
        const activasPersonaje: Array<{
          nombre: string;
          descripcion: string;
          diminutivo: string;
          abierto: boolean;
          tipoEjecucion?: string;
          tipoAccion?: string;
          acciones?: number;
          mejoras: Array<{ nombre: string; descripcion: string }>;
        }> = [];

        nodosArbol.forEach((nodoSel: any) => {
          // El nodo guardado solo trae su nodeId (id del nodo del árbol), no el
          // id de la activa. Hay que resolverlo con la definición del árbol:
          // nodeId -> nodo de arbol.json -> atributo -> id de la activa.
          const def = arbolData.arbol.nodos.find(
            (n) => n.id === Number(nodoSel.nodeId),
          );

          // Solo los nodos cuadrados son activas
          if (!def || def.shape !== "square") return;

          const activa = activasData.activas.find(
            (a) => a.id === parseInt(def.atributo),
          );
          if (activa) {
            activasPersonaje.push({
              nombre: activa.nombre,
              descripcion: activa.descripcion,
              diminutivo: (activa as any).diminutivo || "",
              abierto: false,
              tipoEjecucion: (activa as any).tipoEjecucion,
              tipoAccion: (activa as any).tipoAccion,
              acciones: (activa as any).acciones,
              // Mejoras aportadas por dotes de estilo marcial para esta activa
              mejoras: mejorasPorActiva[String(activa.id)] || [],
            });
          }
        });

        personaje.value.activas = activasPersonaje;
      } catch (error) {
        console.error("Error parseando árbol:", error);
      }
    }

    // Cargar habilidades - Construir siempre desde JSON completo
    try {
      console.log("Construyendo habilidades desde JSON completo");

      // Obtener las habilidades guardadas si existen
      let habilidadesGuardadas: any[] = [];
      if (datos.habilidades) {
        if (typeof datos.habilidades === "string") {
          habilidadesGuardadas = JSON.parse(datos.habilidades);
        } else {
          habilidadesGuardadas = datos.habilidades;
        }
        console.log(
          "Habilidades guardadas encontradas:",
          habilidadesGuardadas.length,
        );
      }

      // Obtener habilidades del trasfondo y especialidad
      const habilidadesTrasfondo = datos.trasfondo_habilidades || [];
      const habilidadesEspecialidad = datos.especialidad_habilidades || [];
      console.log("Habilidades de trasfondo:", habilidadesTrasfondo);
      console.log("Habilidades de especialidad:", habilidadesEspecialidad);

      // Construir lista completa desde habilidadesData.json - MOSTRAR TODAS
      personaje.value.habilidades = habilidadesData.habilidades.map((hab) => {
        // Buscar si hay datos guardados para esta habilidad
        const guardada = habilidadesGuardadas.find(
          (h: any) => h.id === hab.id || h.nombre === hab.nombre,
        );

        // Verificar si viene del trasfondo u especialidad
        const esDeTrasfondo = habilidadesTrasfondo.includes(hab.nombre);
        const esDeEspecialidad = habilidadesEspecialidad.includes(hab.nombre);

        // La habilidad está "activa/marcada" si:
        // 1. Está guardada como activa en habilidades.vue, O
        // 2. Viene del trasfondo/especialidad (siempre marcada)
        const activa = guardada
          ? guardada.activa === true
          : esDeTrasfondo || esDeEspecialidad;

        // Calcular el modificador de atributo
        let modAtributo = 0;
        if (hab.atributo === "Cuerpo") {
          modAtributo = datos.atributos?.cuerpo || 0;
        } else if (hab.atributo === "Agilidad") {
          modAtributo = datos.atributos?.agilidad || 0;
        } else if (
          hab.atributo === "Mente" ||
          hab.atributo === "Artesania" ||
          hab.atributo === "Recoleccion"
        ) {
          modAtributo = datos.atributos?.mente || 0;
        }

        // Calcular el total
        const rangos = guardada?.rangos || 0;
        const bonifDiversos = guardada?.bonifDiversos || 0;

        // Total = modificador de atributo + rangos + bonificadores diversos
        const total = modAtributo + rangos + bonifDiversos;

        console.log(
          `${hab.nombre}: activa=${activa}, mod=${modAtributo}, rangos=${rangos}, bonif=${bonifDiversos}, total=${total}`,
        );

        return {
          nombre: hab.nombre,
          competente: activa,
          total: total,
          atributo: hab.atributo,
        };
      });
      // NO FILTRAR - Mostrar TODAS las habilidades

      console.log(
        "Total de habilidades mostradas:",
        personaje.value.habilidades.length,
      );
    } catch (error) {
      console.error("Error construyendo habilidades:", error);
      personaje.value.habilidades = [];
    }

    // Cargar armas — teniendo en cuenta las estadísticas del personaje:
    // se añade el Poderío a cada tipo de daño que el arma inflige y se aplica
    // el Rango de Crítico del personaje al crítico del arma.
    if (datos.armas && Array.isArray(datos.armas)) {
      console.log("Cargando armas:", datos.armas);
      const poderio = personaje.value.cuerpo.poderio || 0;
      const rangoCritPersonaje = datos.atributos?.rangoCritico ?? 24;

      // Suma el Poderío solo a los tipos de daño que el arma realmente inflige
      const conPoderio = (base: number) => (base > 0 ? base + poderio : 0);

      personaje.value.armas = datos.armas
        .map((armaId: number) => {
          const arma = armasData.armas.find((a) => a.id === armaId);
          if (!arma) return null;

          const rc = calcularRangoCritico(arma.rango_critico, rangoCritPersonaje);

          // Desglose por tipo de daño (para el tooltip), solo tipos con base > 0
          const danos = [
            { etiqueta: "Lacerante", clase: "l", base: arma.lacerante },
            { etiqueta: "Perforante", clase: "p", base: arma.penetrante },
            { etiqueta: "Contundente", clase: "c", base: arma.contundente },
          ]
            .filter((d) => d.base > 0)
            .map((d) => ({ ...d, poderio, final: d.base + poderio }));

          return {
            id: arma.id,
            nombre: arma.nombre,
            // Daño final = base del arma + Poderío (por tipo)
            lac: conPoderio(arma.lacerante),
            cor: conPoderio(arma.penetrante),
            con: conPoderio(arma.contundente),
            critico: arma.critico,
            // Rango de crítico final (arma + personaje) y datos del desglose
            rangoCritico: rc.texto,
            rangoCriticoArma: arma.rango_critico || null,
            rangoCritAmpArma: rc.ampArma,
            rangoCritAmpPersonaje: rc.ampPersonaje,
            distancia: arma.distancia_max || 0,
            poderio,
            danos,
            etiquetas: arma.categoria
              ? arma.categoria.split(",").map((e: string) => e.trim())
              : [],
          };
        })
        .filter((arma: any) => arma !== null);
      console.log("Armas cargadas:", personaje.value.armas.length);
    }

    // Cargar armaduras
    if (datos.armaduras && Array.isArray(datos.armaduras)) {
      console.log("Cargando armaduras:", datos.armaduras);
      personaje.value.armaduras = datos.armaduras
        .map((armaduraId: number) => {
          const armadura = armadurasData.armaduras.find(
            (a) => a.id === armaduraId,
          );
          if (armadura) {
            return {
              id: armadura.id,
              nombre: armadura.nombre,
              lac: armadura.lacerante,
              cor: armadura.penetrante,
              con: armadura.contundente,
              etiquetas: armadura.categoria ? [armadura.categoria] : [],
            };
          }
          return null;
        })
        .filter((armadura: any) => armadura !== null);
      console.log("Armaduras cargadas:", personaje.value.armaduras.length);
    }

    // --- Construir la pseudo-arma "Sin Armas" ---
    // Disponible para todos: 1 + Poderío (contundente). El Pugilista pega más
    // fuerte: 2 + Nivel + Poderío (contundente).
    const esPugilista = datos.estilo_marcial === "Pugilista";
    const poderio = personaje.value.cuerpo.poderio || 0;
    const rangoCritPersonaje = datos.atributos?.rangoCritico ?? 24;
    const baseSinArmas = esPugilista ? 2 + personaje.value.nivel : 1;
    const rcSinArmas = calcularRangoCritico(null, rangoCritPersonaje);
    const sinArmas = {
      id: ID_SIN_ARMAS,
      nombre: "Sin Armas",
      lac: 0,
      cor: 0,
      con: baseSinArmas + poderio,
      critico: "x2",
      rangoCritico: rcSinArmas.texto,
      rangoCriticoArma: null,
      rangoCritAmpArma: rcSinArmas.ampArma,
      rangoCritAmpPersonaje: rcSinArmas.ampPersonaje,
      distancia: 0,
      poderio,
      danos: [
        {
          etiqueta: "Contundente",
          clase: "c",
          base: baseSinArmas,
          poderio,
          final: baseSinArmas + poderio,
        },
      ],
      etiquetas: esPugilista ? ["Pugilista"] : [],
    };

    // Disponibles = armas equipadas + "Sin Armas"; armaduras equipadas
    armasDisponibles.value = [...personaje.value.armas, sinArmas];
    armadurasDisponibles.value = personaje.value.armaduras;

    // "Sin Armas" solo se muestra por defecto si no hay otras armas o si es
    // Pugilista; las armas/armaduras reales se muestran por defecto.
    vistaArmas.value = construirVista(
      armasDisponibles.value.map((a) => a.id),
      datos.armas_vista,
      (id) =>
        id === ID_SIN_ARMAS
          ? personaje.value.armas.length === 0 || esPugilista
          : true,
    );
    vistaArmaduras.value = construirVista(
      armadurasDisponibles.value.map((a) => a.id),
      datos.armaduras_vista,
      () => true,
    );

    console.log("✅ Personaje cargado exitosamente:", personaje.value);
  } catch (error) {
    console.error("❌ Error al cargar el personaje:", error);
  }
}

onMounted(() => {
  void cargarPersonaje();

  // En la partida, los bonos temporales se comparten con el estado de la sesión
  // para que no se pierdan al cerrar la ficha flotante. Se identifica la ficha
  // por la instancia de partida o, en su defecto, por el id del personaje.
  if (props.embebido) {
    const clave = props.personajeExterno?.instanciaId ?? props.characterId;
    if (clave) bonos.value = bonosDeFicha(clave);
  }
});
</script>

<style scoped>
.ficha-root {
  --surface: #ffffff;
  --surface-2: #f5f6f9;
  --surface-3: #eef0f4;
  --border: #e5e7eb;
  --border-2: #eceef2;
  --border-strong: #cbd0da;
  --ink: #14161f;
  --ink-2: #363a47;
  --muted: #6b7080;
  --faint: #9297a4;
  --accent: #4f46e5;
  --accent-soft: #edeefe;

  --cu: #d81f4a;
  --cu-soft: #fdedf1;
  --ag: #0e9488;
  --ag-soft: #e6f5f2;
  --me: #6d5ae6;
  --me-soft: #efedfe;

  --lac: #d8365f;
  --pen: #2f7fd8;
  --con: #cc7d10;
  --hp: #d8365f;
}

.tnum {
  font-variant-numeric: tabular-nums;
}

/* ---------- Barra superior ---------- */
.fx-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.fx-back {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 2px;
}
.fx-back:hover {
  color: var(--ink);
}
.fx-tabs {
  display: flex;
  gap: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 3px;
}
.fx-tab {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  padding: 7px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: transparent;
}
.fx-tab.on {
  color: var(--ink);
  background: var(--surface-2);
  box-shadow: inset 0 0 0 1px var(--border);
}
.fx-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.fx-edit,
.fx-levelup {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 9px;
  padding: 8px 14px;
  cursor: pointer;
}
.fx-edit {
  color: #fff;
  background: var(--accent);
  border: none;
}
.fx-levelup {
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-edit svg,
.fx-levelup svg {
  width: 15px;
  height: 15px;
}
.fx-edit:hover {
  filter: brightness(1.05);
}
.fx-levelup:hover {
  background: color-mix(in srgb, var(--accent) 14%, var(--surface));
}

/* ---------- Panel base ---------- */
.fx-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(20, 22, 31, 0.04),
    0 10px 30px -20px rgba(20, 22, 31, 0.25);
  overflow: hidden;
}
.fx-tabpad {
  padding: 20px;
}
.fx-phead {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.fx-grow {
  flex: 1;
}
.fx-toggle {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  letter-spacing: 0;
  text-transform: none;
}
.fx-toggle:hover {
  text-decoration: underline;
}
.fx-empty {
  padding: 16px 14px;
  font-size: 12.5px;
  color: var(--faint);
  font-style: italic;
}

/* ---------- Botón de configuración (engranaje) ---------- */
.fx-gear {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.fx-gear svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
  transition: transform 0.25s ease;
}
.fx-gear:hover {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-gear:hover svg {
  transform: rotate(45deg);
}
.fx-gear.on {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}

/* ---------- Panel de configuración de equipo ---------- */
.fx-cfg {
  padding: 10px 12px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fx-cfg-hint {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.4;
  margin-bottom: 2px;
}
.fx-cfg-empty {
  font-size: 12px;
  color: var(--faint);
  font-style: italic;
}
.fx-cfg-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 7px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.fx-cfg-move {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-shrink: 0;
}
.fx-cfg-mb {
  width: 20px;
  height: 15px;
  display: grid;
  place-items: center;
  border: none;
  background: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 9px;
  line-height: 1;
  padding: 0;
  border-radius: 4px;
}
.fx-cfg-mb:hover:not(:disabled) {
  color: var(--accent);
  background: var(--accent-soft);
}
.fx-cfg-mb:disabled {
  opacity: 0.3;
  cursor: default;
}
.fx-cfg-name {
  flex: 1;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fx-cfg-eye {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 6px;
  padding: 4px 9px;
  cursor: pointer;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
}
.fx-cfg-eye.off {
  color: var(--faint);
  background: var(--surface-2);
  border-color: var(--border);
}
.fx-cfg-eye:hover {
  filter: brightness(0.97);
}

/* ---------- Fila 1: identidad + HP ---------- */
.fx-row1 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.fx-ident {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: center;
}
.fx-portrait {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 14px;
  flex-shrink: 0;
  background: linear-gradient(140deg, var(--accent), var(--me));
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1px;
  box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--accent) 55%, transparent);
}
.fx-lvl {
  position: absolute;
  left: -8px;
  bottom: -8px;
  min-width: 30px;
  height: 30px;
  padding: 0 6px;
  border-radius: 9px;
  background: var(--surface);
  border: 2px solid var(--accent);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 800;
}
.fx-ident-info h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.4px;
}
.fx-role {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
  font-weight: 600;
}
.fx-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 9px;
}
.fx-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  color: var(--muted);
  background: var(--surface-2);
}
.fx-ident-stats {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fx-mini {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 14px;
  text-align: center;
  min-width: 92px;
}
.fx-mini-l {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
}
.fx-mini-v {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.2;
}
/* Iniciativa clicable (modo embebido). */
.fx-mini {
  background: var(--surface);
  font: inherit;
}
.fx-mini-click {
  cursor: pointer;
  transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
}
.fx-mini-click:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent);
}
.fx-mini-click:active {
  transform: translateY(1px);
}

/* Control compacto de Ventaja / Desventaja (debajo de "Atacar"). */
.fx-adv {
  --tint: var(--border-strong);
  display: flex;
  align-items: stretch;
  gap: 6px;
  padding: 4px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--tint);
  transition: border-color 0.15s ease;
}
.fx-adv.adv {
  --tint: #0e9488;
}
.fx-adv.dis {
  --tint: #d81f4a;
}
.fx-adv-b {
  width: 34px;
  border: none;
  border-radius: 7px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--border-strong);
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  color: var(--muted);
  transition: background 0.12s ease, color 0.12s ease;
}
.fx-adv-b.adv:hover {
  background: #0e9488;
  color: #fff;
}
.fx-adv-b.dis:hover {
  background: #d81f4a;
  color: #fff;
}
.fx-adv-lbl {
  flex: 1;
  border: none;
  border-radius: 7px;
  background: transparent;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--muted);
}
.fx-adv.adv .fx-adv-lbl {
  color: #0e9488;
}
.fx-adv.dis .fx-adv-lbl {
  color: #d81f4a;
}

/* ---------- Ajuste de valores en partida (bonos temporales) ---------- */
/* Botón pequeño −/＋ reutilizable. */
.fx-numb {
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--border-strong);
  border-radius: 5px;
  background: var(--surface);
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
.fx-numb:hover {
  background: color-mix(in srgb, #16a34a 15%, var(--surface));
  color: #16a34a;
  border-color: color-mix(in srgb, #16a34a 40%, var(--border-strong));
}

/* Número editable en las filas de atributos. */
.fx-num {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.fx-num.boost b,
.fx-hex.boost span,
.fx-sh-fig.boost span,
.fx-sp-val.boost,
.fx-sval.boost,
.fx-mini-v.boost {
  color: #16a34a !important;
}

/* Steppers del total (hexágono) y de los escudos / movimiento. */
.fx-hexctrl,
.fx-shctrl {
  display: inline-flex;
  gap: 4px;
}
.fx-shctrl {
  justify-content: center;
  margin-top: 5px;
}

/* Vida: "+X" verde y control de edición. */
.fx-hp-bonus {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 800;
  color: #16a34a;
  vertical-align: baseline;
}
.fx-hpedit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0 2px;
}
.fx-hpedit-l {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--faint);
}
.fx-hpinput {
  width: 54px;
  height: 26px;
  padding: 0 6px;
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  background: var(--surface);
  color: #16a34a;
  font-size: 15px;
  font-weight: 800;
  text-align: center;
  line-height: 1;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}
.fx-hpinput:focus {
  outline: none;
  border-color: color-mix(in srgb, #16a34a 55%, var(--border-strong));
  box-shadow: 0 0 0 2px color-mix(in srgb, #16a34a 22%, transparent);
}

/* HP */
.fx-hpwrap {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.fx-hpmain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.fx-hpbox {
  text-align: center;
}
.fx-hp-cap {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 4px;
}
.fx-hp-field {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 10px 6px;
  background: var(--surface-2);
  font-size: 28px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-hpbox.cur .fx-hp-field {
  color: var(--hp);
  border-color: color-mix(in srgb, var(--hp) 45%, var(--border));
  background: color-mix(in srgb, var(--hp) 6%, var(--surface));
}
.fx-hpbar {
  height: 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--muted) 16%, transparent);
  overflow: hidden;
}
.fx-hpbar > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #e0a41c, var(--hp));
}

/* ---------- Fila 2: atributos + armadura/velocidad ---------- */
.fx-row2 {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.fx-attrs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.fx-attrs > * + * {
  border-left: 1px solid var(--border);
}
.fx-attr {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.fx-attr-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
.fx-attr-name {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--c);
}
/* Hexágono del total de atributo (doble capa para borde limpio) */
.fx-hex {
  position: relative;
  width: 58px;
  height: 66px;
  display: grid;
  place-items: center;
}
.fx-hex::before,
.fx-hex::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.fx-hex::before {
  background: color-mix(in srgb, var(--c) 42%, var(--border));
}
.fx-hex::after {
  inset: 2px;
  background: color-mix(in srgb, var(--c) 9%, var(--surface));
}
.fx-hex span {
  position: relative;
  z-index: 1;
  font-size: 26px;
  font-weight: 800;
  color: var(--c);
  line-height: 1;
}
.fx-attr-rows {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fx-arow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  padding: 3px 5px;
  border-radius: 6px;
}
.fx-arow span {
  color: var(--muted);
}
.fx-arow b {
  font-weight: 800;
  color: var(--ink);
}
.fx-arow:nth-child(odd) {
  background: var(--surface-2);
}

/* Armadura + velocidad */
/* El panel es flex-column para que la rejilla ocupe toda su altura y el
   separador vertical llegue hasta abajo aunque el panel de atributos sea
   más alto. */
.fx-row2 > .fx-panel {
  display: flex;
  flex-direction: column;
}
.fx-acspeed {
  flex: 1;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
}
.fx-acspeed > .fx-sp {
  border-left: 1px solid var(--border);
}
.fx-ac {
  padding: 13px 14px;
}
.fx-ac-lbl {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 11px;
}
.fx-shields {
  display: flex;
  gap: 12px;
  justify-content: center;
}
/* Escudo de armadura (letra encima, número centrado, borde doble capa) */
.fx-sh {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.fx-sh-cap {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.fx-sh-fig {
  position: relative;
  width: 52px;
  height: 58px;
  display: grid;
  place-items: center;
}
.fx-sh-fig::before,
.fx-sh-fig::after {
  content: "";
  position: absolute;
  inset: 0;
  clip-path: polygon(50% 0%, 100% 22%, 100% 66%, 50% 100%, 0% 66%, 0% 22%);
}
.fx-sh-fig span {
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-sh.l .fx-sh-cap {
  color: var(--lac);
}
.fx-sh.l .fx-sh-fig::before {
  background: color-mix(in srgb, var(--lac) 42%, var(--border));
}
.fx-sh.l .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--lac) 9%, var(--surface));
}
.fx-sh.p .fx-sh-cap {
  color: var(--pen);
}
.fx-sh.p .fx-sh-fig::before {
  background: color-mix(in srgb, var(--pen) 42%, var(--border));
}
.fx-sh.p .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--pen) 9%, var(--surface));
}
.fx-sh.c .fx-sh-cap {
  color: var(--con);
}
.fx-sh.c .fx-sh-fig::before {
  background: color-mix(in srgb, var(--con) 42%, var(--border));
}
.fx-sh.c .fx-sh-fig::after {
  inset: 2px;
  background: color-mix(in srgb, var(--con) 9%, var(--surface));
}
.fx-sp {
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
}
.fx-sp-val {
  font-size: 30px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1;
}
.fx-sp-val small {
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
}

/* ---------- Fila 3 ---------- */
.fx-row3 {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 14px;
  align-items: start;
}
.fx-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Habilidades */
.fx-skills {
  max-height: 620px;
  overflow-y: auto;
}
.fx-skill {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--border-2);
}
.fx-skill:last-child {
  border-bottom: none;
}
.fx-prof {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid var(--border-strong);
  background: var(--surface);
}
.fx-prof.on {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: inset 0 0 0 2px var(--surface);
}
.fx-atag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--muted);
  background: var(--surface-3);
  border-radius: 4px;
  padding: 2px 4px;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}
.fx-atag.cu {
  color: var(--cu);
  background: var(--cu-soft);
}
.fx-atag.ag {
  color: var(--ag);
  background: var(--ag-soft);
}
.fx-atag.me {
  color: var(--me);
  background: var(--me-soft);
}
.fx-sname {
  font-size: 12.5px;
  color: var(--ink-2);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fx-skill.comp .fx-sname {
  color: var(--ink);
  font-weight: 600;
}
.fx-skill.dim {
  opacity: 0.62;
}
.fx-sval {
  margin-left: auto;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  min-width: 30px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1px 0;
  background: var(--surface-2);
  flex-shrink: 0;
}
.fx-skill.comp .fx-sval {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}

/* Sección dentro del panel central */
.fx-sect {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--muted);
}
.fx-sect:not(:first-child) {
  border-top: 1px solid var(--border);
}

/* Tabla de ataques */
.fx-atk-head,
.fx-atk-row {
  display: grid;
  grid-template-columns: 1fr 60px 82px 108px;
  gap: 8px;
  align-items: center;
  padding: 9px 14px;
}
.fx-atk-head {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--faint);
}
.fx-atk-row {
  position: relative;
  border-bottom: 1px solid var(--border-2);
}
.fx-atk-row:hover {
  background: var(--surface-2);
  z-index: 5;
}
.fx-atk-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
}
.fx-atk-sub {
  font-size: 11px;
  color: var(--faint);
  margin-top: 1px;
}
.fx-atk-tags {
  display: flex;
  gap: 4px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.fx-tag {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  color: var(--muted);
  background: var(--surface-2);
}
.fx-cell {
  font-size: 12px;
  color: var(--ink-2);
  font-variant-numeric: tabular-nums;
}
.fx-dmgcell {
  display: flex;
  gap: 4px;
}
.fx-dchip {
  flex: 1;
  text-align: center;
  font-size: 11.5px;
  font-weight: 800;
  border-radius: 6px;
  padding: 3px 0;
}
.fx-dchip.l {
  color: var(--lac);
  background: color-mix(in srgb, var(--lac) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--lac) 25%, var(--border));
}
.fx-dchip.p {
  color: var(--pen);
  background: color-mix(in srgb, var(--pen) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pen) 25%, var(--border));
}
.fx-dchip.c {
  color: var(--con);
  background: color-mix(in srgb, var(--con) 10%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--con) 25%, var(--border));
}

/* El panel de ataques no recorta para que el tooltip pueda desbordar */
.fx-panel-atk {
  overflow: visible;
}
.fx-panel-atk > .fx-sect:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* ---- Tooltip de desglose del ataque (al pasar el ratón) ---- */
.fx-atk-tip {
  position: absolute;
  z-index: 30;
  right: 10px;
  top: calc(100% - 6px);
  width: 288px;
  max-width: calc(100% - 20px);
  padding: 12px 13px 13px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  box-shadow: 0 16px 40px -14px rgba(20, 22, 31, 0.45),
    0 3px 10px -5px rgba(20, 22, 31, 0.22);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
  pointer-events: none;
}
.fx-atk-row:hover .fx-atk-tip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.fx-tip-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.2px;
  margin-bottom: 4px;
}
.fx-tip-cap {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  margin: 9px 0 6px;
}
.fx-tip-dmg {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.fx-tip-drow {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fx-tip-type {
  font-size: 10px;
  font-weight: 800;
  padding: 3px 0;
  border-radius: 5px;
  width: 76px;
  text-align: center;
  flex-shrink: 0;
}
.fx-tip-type.l {
  color: var(--lac);
  background: color-mix(in srgb, var(--lac) 12%, var(--surface));
}
.fx-tip-type.p {
  color: var(--pen);
  background: color-mix(in srgb, var(--pen) 12%, var(--surface));
}
.fx-tip-type.c {
  color: var(--con);
  background: color-mix(in srgb, var(--con) 12%, var(--surface));
}
.fx-tip-calc {
  flex: 1;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-2);
  display: flex;
  align-items: baseline;
  gap: 2px;
  white-space: nowrap;
}
.fx-tip-calc small {
  font-size: 8.5px;
  font-weight: 700;
  color: var(--faint);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-left: 1px;
}
.fx-tip-op {
  color: var(--faint);
  font-weight: 800;
  margin: 0 2px;
}
.fx-tip-res {
  font-size: 14px;
  font-weight: 800;
  min-width: 28px;
  text-align: center;
  border-radius: 6px;
  padding: 2px 0;
  flex-shrink: 0;
}
.fx-tip-res.l {
  color: var(--lac);
  background: color-mix(in srgb, var(--lac) 12%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--lac) 30%, var(--border));
}
.fx-tip-res.p {
  color: var(--pen);
  background: color-mix(in srgb, var(--pen) 12%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pen) 30%, var(--border));
}
.fx-tip-res.c {
  color: var(--con);
  background: color-mix(in srgb, var(--con) 12%, var(--surface));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--con) 30%, var(--border));
}
.fx-tip-none {
  font-size: 12px;
  color: var(--faint);
  font-style: italic;
}
.fx-tip-crit {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.fx-tip-crit-main {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
}
.fx-tip-crit-sub {
  font-size: 10.5px;
  color: var(--muted);
  line-height: 1.35;
}

/* Activas */
.fx-act {
  padding: 11px 14px;
  border-bottom: 1px solid var(--border-2);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fx-act:last-child {
  border-bottom: none;
}
.fx-act-h {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fx-act-n {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
}
.fx-cost {
  margin-left: auto;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
  border-radius: 999px;
  padding: 2px 8px;
}
.fx-act-d {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

/* Panel derecho */
.fx-rpad {
  padding: 11px 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fx-feat-src {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--faint);
  margin: 6px 0 2px;
}
.fx-feat-src:first-child {
  margin-top: 0;
}
.fx-feat {
  padding: 8px 2px;
  border-bottom: 1px solid var(--border-2);
}
.fx-feat:last-child {
  border-bottom: none;
}
.fx-feat-n {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
}
.fx-feat-d {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
  margin-top: 3px;
}
.fx-arm {
  padding: 9px 2px;
  border-bottom: 1px solid var(--border-2);
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.fx-arm:last-child {
  border-bottom: none;
}
.fx-arm-top {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.fx-arm-n {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
}

/* Elementos desplegables (dotes y activas) */
.fx-exp {
  border-bottom: 1px solid var(--border-2);
}
.fx-exp:last-child {
  border-bottom: none;
}
.fx-exp-h {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 2px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: inherit;
}
.fx-exp-h:hover .fx-exp-n {
  color: var(--accent);
}
.fx-node {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border));
  border-radius: 5px;
  padding: 2px 5px;
  flex-shrink: 0;
}
.fx-exp-n {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
.fx-tags {
  display: inline-flex;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
}
.fx-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 2px 5px;
  border: 1px solid var(--border);
  white-space: nowrap;
}
.fx-tag-accion {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 25%, var(--border));
}
.fx-tag-pasiva {
  color: var(--muted);
  background: var(--surface-2);
}
.fx-tag-reaccion {
  color: #b45309;
  background: #fef3c7;
  border-color: #fcd9a5;
}
.fx-tag-ritual {
  color: #7c3aed;
  background: #f3e8ff;
  border-color: #e0c8fb;
}
.fx-tag-tipo {
  color: var(--muted);
  background: var(--surface-2);
}
.fx-tag-acc {
  color: var(--muted);
  background: var(--surface-2);
}

/* Bloques de contenido de las innatas (listas, tablas, contadores) */
.fx-bloque {
  margin-top: 10px;
}
.fx-bloque-t {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 5px;
}
.fx-lista {
  margin: 0;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fx-lista li {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.45;
}
.fx-lista li::marker {
  color: var(--accent);
}
.fx-tabla-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-2);
  border-radius: 8px;
}
.fx-tabla {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
}
.fx-tabla th {
  text-align: left;
  font-weight: 800;
  font-size: 9.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--surface-2);
  padding: 6px 8px;
  border-bottom: 1px solid var(--border-2);
  white-space: nowrap;
}
.fx-tabla td {
  padding: 6px 8px;
  color: var(--ink);
  line-height: 1.4;
  border-bottom: 1px solid var(--border-2);
  vertical-align: top;
}
.fx-tabla tbody tr:last-child td {
  border-bottom: none;
}
.fx-tabla tbody td:first-child {
  font-weight: 700;
  white-space: nowrap;
}
.fx-contador {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface-2);
  border-left: 3px solid var(--accent);
}
.fx-contador-l {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
}
.fx-contador-ctrl {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.fx-contador-b {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--accent);
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
}
.fx-contador-b:hover {
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
}
.fx-contador-v {
  min-width: 24px;
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.fx-chev {
  width: 15px;
  height: 15px;
  margin-left: auto;
  flex-shrink: 0;
  fill: none;
  stroke: var(--faint);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.18s ease;
}
.fx-exp.open .fx-chev {
  transform: rotate(180deg);
}
.fx-exp-b {
  padding: 0 2px 11px;
}
.fx-exp-d {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
}

/* Mejoras de activa (aportadas por dotes de estilo marcial) */
.fx-mejoras {
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fx-mejora {
  display: flex;
  gap: 8px;
  padding: 8px 9px;
  border-radius: 8px;
  background: var(--surface-2);
  border-left: 3px solid var(--accent);
}
.fx-mejora-l {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
  flex-shrink: 0;
  padding-top: 1px;
}
.fx-mejora-n {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink);
}
.fx-mejora-d {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.45;
  margin-top: 2px;
}

/* ---------- Responsivo ---------- */
@media (max-width: 1080px) {
  .fx-row3 {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 920px) {
  .fx-row1,
  .fx-row2 {
    grid-template-columns: 1fr;
  }
}

/* Scrollbar discreto en listas internas */
.fx-skills::-webkit-scrollbar {
  width: 6px;
}
.fx-skills::-webkit-scrollbar-thumb {
  background-color: var(--border-strong);
  border-radius: 6px;
}

/* ---------- Interactividad en modo embebido (ficha de partida) ---------- */
/* Elementos "usables" (habilidades / ataques): cursor y realce al pasar. */
.fx-usable {
  cursor: pointer;
}
.fx-skill.fx-usable:hover,
.fx-atk-row.fx-usable:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent);
  border-radius: 8px;
}
.fx-atk-row.fx-usable {
  border-radius: 8px;
}

/* Botón "Usar" en la cabecera de una activa. */
.fx-use-btn {
  margin-left: 6px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border-radius: 6px;
  cursor: pointer;
  line-height: 1.4;
}
.fx-use-btn:hover {
  filter: brightness(1.08);
}

/* Arma seleccionada para atacar (persistente, no solo hover). */
.fx-atk-row.fx-sel,
.fx-atk-row.fx-sel:hover {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--accent);
  border-radius: 8px;
}

/* Chips de daño seleccionables y su estado activo. */
.fx-dchip.fx-dpick {
  cursor: pointer;
}
.fx-dchip.fx-dpick:hover {
  filter: brightness(1.12);
}
.fx-dchip.l.fx-dsel {
  color: #fff;
  background: var(--lac);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--lac) 55%, transparent);
}
.fx-dchip.p.fx-dsel {
  color: #fff;
  background: var(--pen);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--pen) 55%, transparent);
}
.fx-dchip.c.fx-dsel {
  color: #fff;
  background: var(--con);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--con) 55%, transparent);
}

/* Botón destacado "Atacar". */
.fx-attack-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 90%, #fff),
    var(--accent)
  );
  border: 1px solid color-mix(in srgb, var(--accent) 70%, #000);
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--accent) 60%, transparent);
  transition: filter 0.15s ease, transform 0.1s ease;
}
.fx-attack-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
.fx-attack-btn:hover:not(:disabled) {
  filter: brightness(1.08);
}
.fx-attack-btn:active:not(:disabled) {
  transform: translateY(1px);
}
.fx-attack-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
