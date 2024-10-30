
const storedData = JSON.parse(localStorage.getItem("userData"));
let background = storedData.background;
let i=0;
fetch('./json/'+ background +'.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the JSON file: ' + response.statusText);
        }
        return response.json(); // Parse the JSON
    })
    .then(backgrounddata => {
        document.getElementById("backgroundName").innerHTML = backgrounddata.name;
        document.getElementById("description").innerHTML = backgrounddata.description;
        
        backgrounddata.skills.forEach(element => {
            document.getElementById(`skill${i + 1}`).innerHTML = backgrounddata.skills[i];
            i++;
        });
       
    });

    let skills = [4];
function guardarSkills(event){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
   //console.log(`Checkbox ${checkbox.id} está ${checkbox.checked ? 'activado' : 'no activado'}`);
        if(checkbox.checked){
        skills[checkbox.id] = document.getElementById(`skill${checkbox.id}`).innerHTML;
    }
   
    
});
console.log(skills);
localStorage.setItem("skillsOficio","");
let skilljson = {
   skill1: skills[1],
   skill2: skills[2],
   skill3: skills[3]
};
const json = JSON.stringify(skilljson, null, 2);
localStorage.setItem("skillsBackground",json);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('siguiente').addEventListener('click',guardarSkills);
 });