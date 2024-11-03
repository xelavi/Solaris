
const storedData = JSON.parse(localStorage.getItem("userData"));
let oficio = storedData.job;
let i=0;
fetch('./json/oficios/'+ oficio +'.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the JSON file: ' + response.statusText);
        }
        return response.json(); // Parse the JSON
    })
    .then(data => {
        document.getElementById("jobName").innerHTML = data.name;
        document.getElementById("description").innerHTML = data.description;
        
        data.skills.forEach(element => {
            document.getElementById(`skill${i + 1}`).innerHTML = data.skills[i];
            i++;
        });
       
    });
let skills = [4];
let k=0;
function guardarSkills(event){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
   //console.log(`Checkbox ${checkbox.id} está ${checkbox.checked ? 'activado' : 'no activado'}`);
        if(checkbox.checked){
        skills[k] = document.getElementById(`skill${checkbox.id}`).innerHTML;
            ++k;
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
 localStorage.setItem("skillsJob",json);
 }


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('siguiente').addEventListener('click',guardarSkills);
 });

