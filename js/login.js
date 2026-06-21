// ===== GESTIÓN DE LOGIN CON localStorage =====
let baseDatos = [];

// Cargar datos al iniciar
function CargarDatos() {
  const datos = localStorage.getItem("usuarios");
  if (datos) {
    baseDatos = JSON.parse(datos);
  } else {
    baseDatos = [];
  }
}

// Limpiar formulario
function limpiar() {
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}

// Función de login
function Iniciar() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const mensajeDiv = document.getElementById('mensaje');

  if (!email || !password) {
    mostrarMensajeLogin(mensajeDiv, "Email y contraseña son obligatorios", "error");
    return;
  }

  // Buscar usuario
  const usuario = baseDatos.find(user => user.email === email && user.password === password);

  if (!usuario) {
    mostrarMensajeLogin(mensajeDiv, "Email o contraseña incorrectos", "error");
    return;
  }

  // Guardar sesión
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    isAdmin: usuario.isAdmin,
    loginTime: new Date().toLocaleString('es-CO')
  };

  localStorage.setItem("sesionActual", JSON.stringify(sesion));

  mostrarMensajeLogin(mensajeDiv, `¡Bienvenido ${usuario.nombre}!`, "success");
  limpiar();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

// Mostrar mensajes
function mostrarMensajeLogin(elemento, texto, tipo) {
  elemento.innerHTML = `<div class="alert alert-${tipo === "error" ? "danger" : "success"}">${texto}</div>`;
  setTimeout(() => {
    elemento.innerHTML = "";
  }, 4000);
}

// Cargar datos al abrir la página
CargarDatos();
limpiar();
