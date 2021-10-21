miespacio = window.localStorage

const usuario_inicial = JSON.parse(miespacio.getItem("user"))
// Se crea array
var BDusuarios = [...usuario_inicial];
const Total_registros=BDusuarios.length

var divtabla = document.getElementById("cuadro")// div que contiene la tabla
var botonagregar = document.getElementById("btnagregar")
var botoneditar = document.getElementById("btneditar")
botoneditar.disabled = true;
I = Total_registros



////////////////////////////TABLA REGISTROS/////////////
///AGREGAR
function agregar() { //calcula y agrega a la fila de la tabla

    function objeto_usuario(ID, nombre, contraseña) {
        return { ID, nombre, contraseña }

    }

    let Rnombre = document.getElementById("txtusuario").value
    let Rcontraseña = document.getElementById("txtcontraseña").value
    ///validacion de campos requeridos
    if (!Rnombre || !Rcontraseña) {
        alert("Debe ingresar la informacion en todos los campos")
    } else {

        I = I + 1
        //Se crea Objeto y se pasan al constructor los parametros capturaros anteriormente
        const nuevoUsuario = objeto_usuario(I, Rnombre, Rcontraseña)

        //Para invocar la funcion "agregarUsuario"
        agregarUsuarios(nuevoUsuario);

        ///limpia el formilario
        document.getElementById("miForm").reset();
        divtabla.style.display = ''; /// mostrar la tabla
        ///muestra la yabla ya que por lo menos se tiene un registro

    }

}

///////////////////////FUNCION AGREGAR DATOS A ARRAY Y LOCALSTORAGE////////////////
function agregarUsuarios(nuevoUsuario) {
    insertarTabla(BDusuarios)
    BDusuarios.push(nuevoUsuario)

    document.getElementById("mitabla").innerHTML += "<tbody><td>" + nuevoUsuario.ID + "</td><td>" + nuevoUsuario.nombre + "</td><td>" + nuevoUsuario.contraseña + "</td><td>" + `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`+ "</td></tbody>"

    //Se carga los datos en localstorage y variable js
    lista_BDusuariosJSON = JSON.stringify(BDusuarios)
    lista_BDusuarios = JSON.parse(lista_BDusuariosJSON)
    //Se agrega objeto en localStorage
    miespacio.setItem("user", lista_BDusuariosJSON)
}

//////EDITAR
function onEdit(td) {
    ///cambio de botones
    botoneditar.disabled = false;
    botonagregar.disabled = true;
    selectedRow = td.parentElement.parentElement;
    document.getElementById("txtusuario").value = selectedRow.cells[1].innerHTML;
    document.getElementById("txtcontraseña").value = selectedRow.cells[2].innerHTML;
}

/////// ACTUALIZAR DATOS
function actualizarfila() {
    Rnombre = document.getElementById("txtusuario").value
    Rcontraseña = document.getElementById("txtcontraseña").value
    if (!Rnombre || !Rcontraseña) {
        alert("Debe ingresar la informacion en todos los campos")
    } else {
        BDusuarios["Rnombre"] = Rnombre;
        BDusuarios["Rcontraseña"] = Rcontraseña;
        selectedRow.cells[1].innerHTML = BDusuarios.Rnombre;
        selectedRow.cells[2].innerHTML = BDusuarios.Rcontraseña;
        botoneditar.disabled = true;
        botonagregar.disabled = false;
        alert("Usuario editado exitosamente");
        document.getElementById("miForm").reset();
    }
}

/////////eliminar
function onDelete(td) {
    if (confirm('Estas seguro de esto? si lo borras perderas la informacion')) {
        row = td.parentElement.parentElement;
        document.getElementById("mitabla").deleteRow(row.rowIndex);
        ///borrarForm();
        var num = document.getElementById('mitabla').rows.length;
        // alert(num)
        if (num == 1) {
            divtabla.style.display = 'none'; // ocultar
        }
    }
}

function insertarTabla(n) {

    const array = n;

    for (let i = 0; i < array.length; i++) {
        let tabla = document.getElementById("mitabla");
        let nuevaFila = tabla.insertRow(tabla.lenght);

        let cell1 = nuevaFila.insertCell(0);
        cell1.innerHTML = array[i].ID;
        let cell2 = nuevaFila.insertCell(1);
        cell2.innerHTML = array[i].nombre;
        let cell3 = nuevaFila.insertCell(2);
        cell3.innerHTML = array[i].contraseña;
        let cell4 = nuevaFila.insertCell(3);
        cell4.innerHTML = `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
        <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;

    }

}