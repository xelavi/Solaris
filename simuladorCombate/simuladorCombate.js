

const personaje1 = {
    "nombre": "Enric",
    "level": 1,
    "hp": 15,
    "res": 3,
    "dodge": 12,
    "dl": 6,
    "ini": 0,
    "arma": {
        "nombre": "lanza",
        "cortante": 8,
        "perforante": 0,
        "aporreo": 4
    },
    "armadura": [
        {
            "nombre": "armadura de anillas",
            "cortante": 3,
            "perforante": 3,
            "aporreo": 3
        },
        {
            "nombre": "escudo",
            "cortante": 2,
            "perforante": 2,
            "aporreo": 2
        }
    ] 
    
}

let hp_actualp1,hp_actualp2;
let iniciativa = [];
let to_hit;
let daño;
let resistencia;
function empezarCombate() {
    //Cargar personajes
    console.log("Empieza el combate");
    console.log(personaje1.nombre);
    console.log(personaje1.nombre);



    //Tirar iniciativa
    
  iniciativa[0] =  Math.floor(Math.random() * 12)+1 + Math.floor(Math.random() * 12)+1 ;
  iniciativa[1] = Math.floor(Math.random() * 12)+1 + Math.floor(Math.random() * 12)+1 ;
  console.log(iniciativa[0]);
}

empezarCombate();