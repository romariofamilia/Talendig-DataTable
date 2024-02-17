const inNombre = document.querySelector('#nombre');
const inApellido = document.querySelector('#apellido');
const inCurso = document.querySelector('#curso');
const inNota = document.querySelector('#nota');
const add = document.querySelector('#add');
const clear = document.querySelector('#clear');
const inputs = document.querySelectorAll('input');

const estudiantes = []

add.addEventListener('click', (e) => {
    e.preventDefault()
    if(inNombre.value && inApellido.value && inCurso.value && inNota.value) {
        addEstudiante()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se anadio de forma exitosa",
            showConfirmButton: false,
            timer: 1500
          });
        
    } else {
        alert('Ingrese todos los datos')
    }
    console.log(estudiantes);
})

clear.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(element => {
        element.value = '';
    })
})
    


function addEstudiante() {
    let estudiante = {
        'nombre':inNombre.value,
        'apellido':inApellido.value,
        'curso':inCurso.value,
        'nota':inNota.value
    };

    estudiantes.push(estudiante)

    const tbody = document.querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${estudiante.nombre}</td>
    <td>${estudiante.apellido}</td>
    <td>${estudiante.curso}</td>
    <td>${estudiante.nota}</td>
    <button id="del">Eliminar</button>
    <button id="edit">Editar</button>
    `
    tbody.appendChild(newRow);
    

    edit(estudiante, newRow)
    del(estudiante, newRow)

    console.log(estudiante);
    
}

function del(obj, row) {
    const bDel = row.querySelector('#del');
    bDel.addEventListener('click', function (e) {
      e.preventDefault();
      Swal.fire({
        title: "Estas seguro?",
        text: "Esto no se podra revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si eliminalo"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "Ha sido eliminado exitosamente",
            icon: "success"
          });
        }
      });
  
      // Lo remueve del DOM
      row.remove();
  
      // Encuentra el indice que sera eliminado del arreglo
      const index = estudiantes.indexOf(obj);

      console.log(index);
      // Remueve el objeto de el array si existe
      if (index !== -1) {
        estudiantes.splice(index, 1);
      }
    });
  }
  



function edit(obj,row) {
    const editButton = row.querySelector('#edit');
    editButton.addEventListener('click', (e) => {
        e.preventDefault()
        Swal.fire({
                title: "Estas Seguro",
                text: "Quieres Editar?",
                icon: "question"
              });
              
        const bContainer = document.querySelector('.button_container');
        const bCambiar = document.createElement('button');
        bCambiar.textContent = 'Cambiar';

        bContainer.appendChild(bCambiar);

        bCambiar.addEventListener('click', function(e) {
            e.preventDefault()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se edito exitosamente",
                showConfirmButton: false,
                timer: 1500
              });

            const index = estudiantes.indexOf(obj);

            console.log(index);
            
            if (index !== -1) {
                estudiantes.splice(index, 1);
            }

            obj.nombre = inNombre.value;
            obj.apellido = inApellido.value;
            obj.curso = inCurso.value;
            obj.nota = inNota.value;

            row.children[0].textContent = obj.nombre;
            row.children[1].textContent = obj.apellido;
            row.children[2].textContent = obj.curso;
            row.children[3].textContent = obj.nota;


            estudiantes.push(obj);
            console.log(obj,estudiantes);
            bCambiar.remove()
        })
    })
}