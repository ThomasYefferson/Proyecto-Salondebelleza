var baseDatos = []

var limpiar = function() {
    var nombre = document.getElementById('nombre').value = ""
    var apellido = document.getElementById('apellido').value = ""
    var celular = document.getElementById('celular').value = ""
    var email = document.getElementById('email').value = ""
    var password = document.getElementById('password').value = ""

    
}

var GuardarUsuarios = function() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var celular = document.getElementById('celular').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    baseDatos.push({name:nombre,surname:apellido,cell:celular,mail:email,pass:password})
    localStorage.setItem("base",JSON.stringify(baseDatos))
    limpiar()
    window.alert("Bienvenid@ a nuestra pagina web - AngieFashion")
    
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

CargarDatos()
