//Conectamos con localStorage
miespacio = window.localStorage


var VTpago = ""
I = 0


function cancelar() {
    document.getElementById("form-venta").reset()
}
//////FUNCION PARA VALIDAR. CAPTURAR DATOS Y CREACION DE OBJETO///////////
function datos_venta() {
    //Se crea funcion/Constructor para captar los datos Obejetos
    function objeto_venta(ID, Nombre, Email, Tpago) {
        const urlparams = new URLSearchParams(window.location.search);
        const valor = urlparams.get("valor")
        return { ID, Nombre, Email, Tpago, Pagado: valor }

    }
    //Se capturan los datos de la venta
    let Vusuario = document.getElementById("txt_nombre_completo").value
    let Vemail = document.getElementById("txt_email_venta").value

    if (document.getElementById("radio1").checked) {
        VTpago = "Efectivo"
    } if (document.getElementById("radio2").checked) {
        VTpago = "Tarjeta"
    } if (document.getElementById("radio3").checked) {
        VTpago = "Transferencia"
    }
    //validacion de campos vacios
    if (!Vusuario || !Vemail || !VTpago) {
        alert("Debe ingresar la informacion en todos los campos")
    } else {
        if (confirm("Verifique los datos antes de guardar la venta")) {
            //Contadora de ID
            I = I + 1
            //Se crea Objeto y se pasan al constructor los parametros capturaros anteriormente
            const nuevaVenta = objeto_venta(I, Vusuario, Vemail, VTpago)
            //Para invocar la funcion "agregarVenta"
            agregarVenta(nuevaVenta);
        }
        //Se limpia los textbox
        document.getElementById("form-venta").reset()

    }
}
//Se crea array para guardar objetos de datos
BDventaUsuarios = [];
///////////////////////FUNCION AGREGAR DATOS A ARRAY Y LOCALSTORAGE////////////////
function agregarVenta(nuevaVenta) {
    BDventaUsuarios.push(nuevaVenta)
    console.log(BDventaUsuarios)
    //Se carga los datos en localstorage y variable js
    lista_BDventaUsuariosJSON = JSON.stringify(BDventaUsuarios)
    lista_BDventaUsuarios = JSON.parse(lista_BDventaUsuariosJSON)
    //Se agrega objeto en localStorage
    miespacio.setItem("Vuser", lista_BDventaUsuariosJSON)
    alert("Venta guardada con exito")
}