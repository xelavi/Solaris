// script.js
function loadContent(page) {
    const contentDiv = document.getElementById('content');
    if (page === 'stats') {
        contentDiv.innerHTML = `
             <div class="character-info">
            <div class="flex">
            <p>Nombre: </p> <p id="name"></p> </div>
            
            <div class="flex">
            <p>Profesión: </p> <p id="job"></p></div>
            
            <div class="flex">
            <p>Estilo Marcial: </p> <p id="martialStyle"></p></div>
            <div class="flex">
            <p>Trasfondo: </p> <p id="background"></p></div>
            <div class="flex">
            <p>Nivel: </p> <p id="level"></p></div>
            
        </div>
    
        <div class="stats">
            <h2>Estadísticas</h2>
    
            <div class="stat-group">
                <h3>Body</h3> 
                <p>HP:</p> <p id="hp"></p>
                <p>Resistencia al Daño:</p> <p id="resistance"></p>
                <p>Movimiento:</p> <p id="movement"></p>
                <p>Capacidad de carga:</p> <p id="cc"></p>
                <p>Deadlift:</p> <p id="deadlift"></p>
            </div>
    
            <div class="stat-group">
                <h3>Agility</h3> 
                <p>Dodge:</p> <p id="dodge"></p>
                <p>Iniciativa:</p> <p id="initiative"></p>
                <p>Acciones:</p> <p id="actions"></p>
                <p>Deadeye:</p> <p id="deadeye"></p>
            </div>
    
            <div class="stat-group">
                <p>To hit body:</p> <p id="toHitB"></p>
                <p>To hit agility:</p> <p id="toHitA"></p>
            </div>
        </div>
    
        <div class="equipment">
            <h2>Equipo</h2>
            <p>Armas:</p>
        </div>
        `;
    } else if (page === 'skills') {
        contentDiv.innerHTML = `
           <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas de Habilidades</title>
    <style>
    
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Estadísticas de Habilidades</h1>
    <table>
        <thead>
            <tr>
                <th>Habilidad</th>
                <th>Atributo</th>
                <th>Rangos</th>
                <th>Bonificadores Varios</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Atletismo</td>
                <td></td>
                <td>3</td>
                <td>+2</td>
            </tr>
            <tr>
                <td>Nadar</td>
                <td></td>
                <td>2</td>
                <td>+1</td>
            </tr>
            <tr>
                <td>Aguante</td>
                <td></td>
                <td>4</td>
                <td>+3</td>
            </tr>
            <tr>
                <td>Académicas</td>
                <td></td>
                <td>5</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Medicina</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Naturaleza</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Geografía</td>
                <td></td>
                <td>2</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Tasación</td>
                <td></td>
                <td>1</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Antropología/Política</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Historia</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Pilotaje</td>
                <td></td>
                <td>2</td>
                <td>+1</td>
            </tr>
            <tr>
                <td>Investigación/Buscar</td>
                <td></td>
                <td>5</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Orientación/Navegación</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Percepción</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Supervivencia</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Persuasión</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Cautivación</td>
                <td></td>
                <td>2</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Intimidación</td>
                <td></td>
                <td>2</td>
                <td>+2</td>
            </tr>
            <tr>
                <td>Averiguar intenciones</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Performance</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Sigilo</td>
                <td></td>
                <td>5</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Juego de manos</td>
                <td></td>
                <td>3</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Acrobacias</td>
                <td></td>
                <td>4</td>
                <td>+0</td>
            </tr>
            <tr>
                <td>Artesanía/Arte</td>
                <td></td>
                <td>5</td>
                <td>+0</td>
            </tr>
        </tbody>
    </table>
</div>

</body>
</html>
        `;
    } else if (page === 'job') {
        contentDiv.innerHTML = `
         <h1> Aqui no hay nada, vete a otra pagina.  </h1>
         <p> PD: Hoy hay que acabar lo de oficios.</p>
        `;
    }
}
