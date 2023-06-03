var baseDatos = []

var limpiar = function() {
    var email = document.getElementById('email').value = ""
    var password = document.getElementById('password').value = ""

    
}
var CargarDatos = function(){
    var Misdatos = localStorage.getItem("base")
    if(Misdatos == null){
        baseDatos = []

    }
    else{
        baseDatos = JSON.parse(Misdatos)
    }
}
limpiar()
var Iniciar = function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    var posicion = baseDatos.findIndex((item) => item.mail == email && item.pass == password)
    console.log(posicion)

    var msj = document.getElementById('mensaje')
    if(posicion == -1){
        msj.innerHTML = "<div class='alert alert-danger' role='alert'> Usuario invalido </div>"

    }
    else{
        msj.innerHTML = "<div class='alert alert-success' role='alert'> Bienvenid@ "+baseDatos[posicion].name +" </div>"
    }      
    
}
CargarDatos()
limpiar()
