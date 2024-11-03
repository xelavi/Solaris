







let j=1;
document.addEventListener('DOMContentLoaded', () => {
    let table = document.getElementById('table');
   
    let skillsBackground = JSON.parse(localStorage.getItem("skillsBackground"));
    let skillsJob = JSON.parse(localStorage.getItem("skillsJob"));
    
    let atributes = JSON.parse(localStorage.getItem("skillsAtr"));
    document.getElementById("skillpoints").innerText = atributes.skillpoints;
  
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
    
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                const row = this.closest('tr');
                updateOutput(row,atributes.skillpoints);
            });
        });
        
      
 });

 function updateOutput(row,atr) {
    const input1 = row.querySelector('.input1').value;
    const input2 = row.querySelector('.input2').value;
    const outputCell = row.querySelector('.output');

    // Example logic: the output is the sum of input1 and input2
    const output = (parseFloat(input1) || 0) + (parseFloat(input2) || 0);
    outputCell.textContent = output;
    const outputCells = document.querySelectorAll('.output');
    let total = 0;
    outputCells.forEach(cell => {
        total += parseFloat(cell.textContent) || 0;
    });
    document.getElementById('skillpoints').innerHTML = atr - total;
}

// Add event listeners to each input field
