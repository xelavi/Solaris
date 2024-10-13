let level = 0;
let body=0;
    let hp = 0;
    let resistance = 0;
    let cc = 0;
    let deadlift = 0;
    let movement = 0;
let agility = 0;
    let dodge = 0;
    let initiative = 0;
    let actions = 0;
    let deadeye = 0;
let mind = 0;
    let skillpoints=0;
let toHit=0;


  function loadJSONFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            try {
                const data = JSON.parse(content);
                calculateNodes(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
}


    function calculateNodes(data) {

        
        document.getElementById('name').innerText = data.name;
        document.getElementById('job').innerText = data.job;
        level = document.getElementById('level').innerText = data.level;
        document.getElementById('background').innerText = data.background;
        document.getElementById('martialStyle').innerText = data.martialStyle;
        
     data.nodes.forEach(node => {
        
            if(node.shape == 'circle-enabled'){
                if(node.text=='HP') hp++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='B') body++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='R') resistance++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='M') movement++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='DL') deadlift++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='A') agility++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='INI') initiative++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='DE') deadeye++;
            }
            if(node.shape == 'circle-enabled'){
                if(node.text=='AC') dodge++;
            }


        })
      calculateStats();
    }


    function calculateStats(){
        //HP
        document.getElementById('hp').innerText = 12 + (hp*12) + (level*2) + (body*level);
        //RESISTANCE
        document.getElementById('resistance').innerText = (resistance*3)+(body*3);
        //MOVEMENT SPEED
        document.getElementById('movement').innerText = 3 + body + movement;
        //DEADLIFT
        document.getElementById('deadlift').innerText = (deadlift*3)+(body*3);
        //CC
        document.getElementById('cc').innerText = 0;
        //DODGE
        document.getElementById('dodge').innerText = 12+(dodge*3)+(agility*3);
        //INITIATIVE
        document.getElementById('initiative').innerText = (initiative*3)+(agility*3);
        //ACTIONS
        document.getElementById('actions').innerText = 3;
        //DEADEYE
        document.getElementById('deadeye').innerText = (deadeye*3)+(agility*3);
        //TO HIT
        document.getElementById('toHitB').innerText = (level*1 + body*1);
        document.getElementById('toHitA').innerText = (level*1 + agility*1);

        
    }


    document.addEventListener('DOMContentLoaded', () => {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load the JSON file: ' + response.statusText);
                }
                return response.json(); // Parse the JSON
            })
            .then(data => {
                 calculateNodes(data);
            });
    });


    






//document.getElementById("downloadJSON").addEventListener("change", loadJSONFile);
