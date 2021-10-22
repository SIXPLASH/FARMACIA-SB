//Conectar con localStorage
miespacio = window.localStorage
//Se reciben la informacion ("user") alojada en el localStore y se guarda en variable local
const usuario_inicial = JSON.parse(miespacio.getItem("user"))
// Se crea array y se le pasa la informacion de la variable bajada del localStore
var BDusuarios = [...usuario_inicial];
//Se captura el tamañol array y guarda en variable
const Total_registros = BDusuarios.length
//Se capturan en variables los id de los botones
var divtabla = document.getElementById("cuadro")// div que contiene la tabla
var botonagregar = document.getElementById("btnagregar")
var botoneditar = document.getElementById("btneditar")
botoneditar.disabled = true;
I = Total_registros


////////////////////////////TABLA REGISTROS/////////////
//Funcion para AGREGAR
function agregar() { //calcula y agrega a la fila de la tabla
//funcion para recibir datos y crear objeto
    function objeto_usuario(ID, nombre, contraseña) {
        return { ID, nombre, contraseña }

    }
//Se capturan los datos ingresados
    let Rnombre = document.getElementById("txtusuario").value
    let Rcontraseña = document.getElementById("txtcontraseña").value
    ///validacion de campos requeridos
    if (!Rnombre || !Rcontraseña) {
        alert("Debe ingresar la informacion en todos los campos")
    } else {
//Incremento del valor del ID del objeto
        I = I + 1
        //Se crea Objeto y se pasan al constructor los parametros capturaros anteriormente
        const nuevoUsuario = objeto_usuario(I, Rnombre, Rcontraseña)

        //Para invocar la funcion "agregarUsuario"
        agregarUsuarios(nuevoUsuario);

        ///limpia el formilario
        document.getElementById("miForm").reset();
        divtabla.style.display = ''; /// mostrar la tabla
    }

}

///////////////////////FUNCION AGREGAR DATOS A ARRAY Y LOCALSTORAGE////////////////
function agregarUsuarios(nuevoUsuario) {
    insertarTabla(BDusuarios)//Se invoca la funcion "insetarTabla" y se guarda los datos del objeto "BDusuarios"
    BDusuarios.push(nuevoUsuario)//Se utiliza el metodo push para agrgar nuevo objeto (nuevoUsuario) al array
//Se crea nueva linea para la tabla con id "mitabla"
    document.getElementById("mitabla").innerHTML += "<tbody><td>" + nuevoUsuario.ID + "</td><td>" + nuevoUsuario.nombre + "</td><td>" + nuevoUsuario.contraseña + "</td><td>" + `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`+ "</td></tbody>"

    //Se convierte los datos del objeto a JSON
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
        document.getElementById("mitabla").deleteRow(row.rowIndex);///Se borra fila segun indicada en "td"
        var num = document.getElementById('mitabla').rows.length;
        //Condicional si hay almenos 1 registro se muestra tabla
        if (num == 1) {
            divtabla.style.display = 'none'; // ocultar
        }
    }
}
///////////CRAR TABLA SI EXISTEN REGISTROS EN localStorage///////////////////
function insertarTabla(n) {//"n" es el objeto que capturamos antes y pasamos por parametro

    const array = n;

    for (let i = 0; i < array.length; i++) {// Ciclo for para llenado de tabla
        let tabla = document.getElementById("mitabla");
        let nuevaFila = tabla.insertRow(tabla.lenght);
// Creamos filas y llenamos con los datos del obejeto
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