let background;
let backgroundDescription;
let skills = [];


function json(event){
    
    const dropdown = document.getElementById("background");
    const oficio = document.getElementById("job");
    let data = {
            name: document.getElementById('name').value,
            level: 1,
            job: oficio.options[oficio.selectedIndex].value,
            background: dropdown.options[dropdown.selectedIndex].value
    }
  //   data = "";
    const json = JSON.stringify(data, null, 2);
    //console.log(json);
    localStorage.setItem("userData",json);
}



document.addEventListener('DOMContentLoaded', () => {
   
   // const storedData = JSON.parse(localStorage.getItem("userData"));
  //  document.getElementById('name').value = storedData.name;
    //STATS
    document.getElementById('background').addEventListener('input',json);
    document.getElementById('name').addEventListener('input',json);
    document.getElementById('job').addEventListener('input',json);
    document.getElementById('martialStyle').addEventListener('input',json);
   
});