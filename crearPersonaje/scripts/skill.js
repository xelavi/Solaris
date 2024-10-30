







let j=1;
document.addEventListener('DOMContentLoaded', () => {
    let table = document.getElementById('table');
   
    let skillsBackground = JSON.parse(localStorage.getItem("skillsBackground"));
    let skillsJob = JSON.parse(localStorage.getItem("skillsJob"));
    
    let atributes = JSON.parse(localStorage.getItem("skillsAtr"));

    for (let i = 1; i < table.rows.length; i++) {


        if(skillsBackground.skill1 == table.rows[i].cells[1].innerHTML ||skillsBackground.skill2 == table.rows[i].cells[1].innerHTML || skillsBackground.skill3 == table.rows[i].cells[1].innerHTML 
            || skillsJob.skill1 == table.rows[i].cells[1].innerHTML || skillsJob.skill2 == table.rows[i].cells[1].innerHTML || skillsJob.skill3 == table.rows[i].cells[1].innerHTML
        ){
            let input = table.rows[i].cells[0].querySelector("input");
            if(input){
                input.disabled = false;
                input.checked = true;
            }
            }
            j++;
        }
        
       let mind = document.querySelectorAll("td.mind");
       let body = document.querySelectorAll("td.body");
       let agility = document.querySelectorAll("td.agility");

        mind.forEach(element => {
            element.innerHTML = atributes.mind;
        });

        body.forEach(element => {
            element.innerHTML = atributes.body;
        });
        agility.forEach(element => {
            element.innerHTML = atributes.agility;
        });
    
      
 });