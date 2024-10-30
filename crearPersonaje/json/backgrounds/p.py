import json

# Define the data for each background
backgrounds = [
    {
        "name": "Hijo de vecino",
        "description": "Has nacido en el seno de una familia de clase media, bien alimentado y con todas las necesidades básicas cubiertas. Puedes tener una mascota doméstica y/o puedes no tenerla. Tu infancia ha sido feliz, o no. No tienes ningún trauma, si no quieres.",
        "skills": [
            "Percepción",
            "Persuasión",
            "Medicina (Herboristería)",
            "Tasación",
            "Cautivación",
            "Artesanía/Arte"
        ]
    },
    {
        "name": "Noble",
        "description": "Ya sea en el imperio de Limsa Lomensa o de Lenam, has crecido en una familia acaudalada y llena de privilegios y responsabilidades. Te desenvuelves con soltura en los escarceos de la política y la corte. Sabes defenderte decentemente y montar. Sabes leer y escribir en distintos idiomas. Posiblemente seas un antipático, racista y mimado como solo tú sabes.",
        "skills": [
            "Heráldica",
            "Persuasión",
            "Intimidación",
            "Equitación",
            "Antropología/Política",
            "Averiguar intenciones"
        ]
    },
    {
        "name": "Desperado",
        "description": "Ya sea en las bulliciosas calles de Limsa Lomensa, los pulcros salones de las Catedrales de Lenam, las estepas rocosas o los desiertos abrasadores, el Desperado aguarda una distracción para aprovechar su oportunidad y sacar provecho. Buscavidas de nacimiento, la vida no ha tratado bien al querido Desperado, acostumbrado a tener que tirar pa’lante. Se sabe desenvolver con improvisación y sutileza de las situaciones más inverosímiles.",
        "skills": [
            "Supervivencia",
            "Sigilo",
            "Juego de manos",
            "Percepción",
            "Persuasión",
            "Aguante"
        ]
    },
    {
        "name": "Trotamundos itinerante y ambulante",
        "description": "No te sabes estar quieto y has viajado por gran parte del mundo conocido. Sabes tratar a la gente según tus intereses y conoces canciones de todas partes y has escuchado muchas historias que se ganarían una ronda de cerveza.",
        "skills": [
            "Orientación/Navegación",
            "Percepción",
            "Persuasión",
            "Performance",
            "Supervivencia",
            "Historia"
        ]
    },
    {
        "name": "Hijo de la mar",
        "description": "Tu vida ha sido una aventura. Has nacido en un barco y seguramente esperes morir en uno. Te han enseñado las leyes del océano y lo respetas como es debido. Has aprendido a navegar y has visto muchos puertos.",
        "skills": [
            "Navegación",
            "Supervivencia",
            "Pilotaje (de embarcaciones)",
            "Percepción",
            "Aguante",
            "Geografía"
        ]
    },
    {
        "name": "Huérfano de Lenam",
        "description": "Habiendo fracasado en las pruebas para formar parte de la organización de los Caballeros del Silencio, un huérfano en el reino de Lenam está obligado a contribuir a la sociedad. Entrando como aprendiz de algún oficio artesano o en alguna cadena de producción. También puede ser que guardes rencor a aquellos que te examinaron o a lo injustamente desigual que es la sociedad con la gente como tú. En tal caso, también puede ser que te hayas marchado de la ciudad-capital y hayas emprendido un viaje en barco o te hayas aventurado en una de las caravanas que cruzan los desiertos.",
        "skills": [
            "Aguante",
            "Artesanía/Arte",
            "Supervivencia",
            "Sigilo",
            "Intimidación",
            "Investigación/Buscar"
        ]
    },
    {
        "name": "Monaguillo de la Cofradía de Bharak",
        "description": "La congregación religiosa más importante de Limsa Lomensa, tienen mucha influencia política, al nivel de que sin ellos el imperio de Mudab Il Nam no habría podido desarrollarse. Tienen conocimientos muy antiguos y valiosos que se remontan a centenares de años. Muchos eruditos y líderes buscan pasar años estudiando en las bibliotecas de sus templos. Guardan muchos secretos y tienen su propia Orden Militar. Los maestros de armas son integrantes en su mayoría de dicha organización.",
        "skills": [
            "Historia",
            "Antropología/Política",
            "Percepción",
            "Persuasión",
            "Medicina (Herboristería)",
            "Cautivación"
        ]
    },
    {
        "name": "Protegido de la espina mortecina",
        "description": "Miembro de una organización anárquica que quiere ver en llamas la forma de gobierno de Lenam. Viven en las sombras de los lugares más recónditos del reino y aguardan su venganza. De cara al mundo, son una organización privada de servicios. Suelen ser contratados para vigilar, escoltar, secuestrar y matar. Pero son muy caros comparados con otras organizaciones, aunque estos son letales y tienen la fama de jamás fracasar en sus misiones. Se dice por las tabernas y los barracones que un asesino de la espina mortecina equivale a veinte asesinos al uso.",
        "skills": [
            "Sigilo",
            "Intimidación",
            "Percepción",
            "Juego de manos",
            "Cautivación",
            "Averiguar intenciones"
        ]
    }
]

# Save each background to a separate .json file
file_paths = []
for background in backgrounds:
    file_name = f"{background['name'].replace(' ', '_').lower()}.json"
    file_paths.append(file_name)
    with open(file_name, 'w', encoding='utf-8') as f:
        json.dump(background, f, ensure_ascii=False, indent=4)

file_paths
