const url="https://crudjs-3c555.firebaseio.com/";

function add() {
    console.log('add');

    let student = {
        Nombre: document.getElementById('Nombre').value,
        Apellido: document.getElementById('Apellido').value,
        Matricula: document.getElementById('Matricula').value,
        Telefono: document.getElementById('Telefono').value
    }

    console.log(student);
    console.log(JSON.stringify(student));

    fetch(url + 'alumnos.json', {
        method : 'POST',
        body : JSON.stringify(student),
        headers : {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json()).catch(error => console.error('Error:',error)).then(response => console.log('Success',response));
}

function search() {
    const textTosearch = document.getElementById('Id').value;
    
    if(textTosearch=="") return;

    fetch(`${url}/alumnos/${textTosearch}.json`,{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        } 
    }).then(res => res.json())
    .catch(error => console.log('ERROR',error))
    .then(response => {
        console.log(response);
        document.getElementById('Nombre').value = response.Nombre;
        document.getElementById('Apellido').value = response.Apellido;
        document.getElementById('Matricula').value = response.Matricula;
        document.getElementById('Telefono').value = response.Telefono;

    })
}

async function searchAsync() {
    const textTosearch = document.getElementById('Id').value;
    
    if(textTosearch=="") return;

    const response = await fetch(`${url}/alumnos/${textTosearch}.json`,{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        } 
    });

    const student = await response.json();

    document.getElementById('Nombre').value = student.Nombre;
    document.getElementById('Apellido').value = student.Apellido;
    document.getElementById('Matricula').value = student.Matricula;
    document.getElementById('Telefono').value = student.Telefono;

    console.log(student);
    console.log('continue...')
}

function modify() {
    const id = document.getElementById('Id').value;

    let student = {
        Nombre: document.getElementById('Nombre').value,
        Apellido: document.getElementById('Apellido').value,
        Matricula: document.getElementById('Matricula').value,
        Telefono: document.getElementById('Telefono').value
    }

    fetch(`${url}/alumnos/${id}.json`, {
        method : 'PUT',
        body: JSON.stringify(student),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json())
    .catch( error => console.error('ERROR:',error))
    .then(response => console.log('Success: ',response));
}

async function deleterow(id,row) {
    //console.log(id);

    const response = await fetch(`${url}/alumnos/${id}.json`,{
        method : "DELETE",
        headers :{
            'Content-Type': 'application/json'
        }
    });

    const student = await response.json();
    console.log(student);

    const index = row.parentNode.parentNode.rowIndex;
    document.getElementById('tb').deleteRow(index);


}

async function selectAsync(id) {
    if(id=="") return;

    const response = await fetch(`${url}/alumnos/${id}.json`,{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        } 
    });

    const student = await response.json();

    document.getElementById('Id').value = id;
    document.getElementById('Nombre').value = student.Nombre;
    document.getElementById('Apellido').value = student.Apellido;
    document.getElementById('Matricula').value = student.Matricula;
    document.getElementById('Telefono').value = student.Telefono;
}


function printInfo() {
    let students;

    fetch(`${url}/alumnos/.json`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json())
    .catch( error => console.error('ERROR:',error))
    .then(response => {
        students = response;
        console.log('Data: ',students);
        Object.keys(students).map((key) => {
            console.log(key);
            let table = document.getElementById('tb');
            let row = table.insertRow(1);
            
            let cell = row.insertCell(0);
            cell.innerHTML = students[key].Apellido;
            
            cell = row.insertCell(1);
            cell.innerHTML = students[key].Matricula;
            
            cell = row.insertCell(2);
            cell.innerHTML = students[key].Nombre;
            
            cell = row.insertCell(3);
            cell.innerHTML = students[key].Telefono;
            
            cell = row.insertCell(4);
            cell.innerHTML = `<button type="buttonTableSelect" onclick="selectAsync(${key})">Seleccionar</button>`;
            
            cell = row.insertCell(5);
            cell.innerHTML = `<button type="buttonTableDelete" onclick="deleterow(${key},this)">Eliminar</button>`;
        })
    });
}

function refresh(){
    window.location.href = "index.html";
}

window.onload = () => {
    printInfo();
}

jQuery(document).ready(function(){
    $('h1').mousemove(function(e){
      var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
      var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
      $('h1').css('text-shadow', +rYP/10+'px '+rXP/80+'px rgba(227,6,19,.8), '+rYP/8+'px '+rXP/60+'px rgba(255,237,0,1), '+rXP/70+'px '+rYP/12+'px rgba(0,159,227,.7)');
    });
 });