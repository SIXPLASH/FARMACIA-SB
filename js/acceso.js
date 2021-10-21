miespacio = window.localStorage
//////////////////////PERMISO DE ACCESO//////////////////////
function acceder() {

    //crear un array
    let usuarios=[]
    //ingresar datos en array
    usuarios.push({ID: 1, nombre: "jaison", contraseña: "0001"})
    usuarios.push({ID: 2, nombre: "miguel", contraseña: "0002"})
    usuarios.push({ID: 3, nombre: "jorge", contraseña: "0003"})

    //Se carga lso datos en localstorage y variable js
    lista_usuariosJSON= JSON.stringify(usuarios)
    lista_usuarios=JSON.parse(lista_usuariosJSON)
    miespacio.setItem("user", lista_usuariosJSON)

    //Se guarda los valores de la caja de texto en variables locales
    let txt_usuario=document.getElementById("txt_usuario").value
    let txt_contraseña=document.getElementById("txt_contraseña").value

    let sw=0
    for (let i = 0; i < lista_usuarios.length-1; i++) {

        if(txt_usuario==lista_usuarios[i].nombre && txt_contraseña== lista_usuarios[i].contraseña){
            alert("Bienvenido "+txt_usuario);
            sw=1

        }
    }
        if (sw ==1) {
            window.open("agregar_usuarios.html","_self")
        } else {
            alert("usuario y/o contraseña no validos ");
        }

    }