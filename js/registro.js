// ===== GESTIÓN DE REGISTRO CON localStorage =====
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

// Guardar datos en localStorage
function guardarEnStorage() {
  localStorage.setItem("usuarios", JSON.stringify(baseDatos));
}

// Limpiar formulario
function limpiar() {
  document.getElementById('nombre').value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('celular').value = "";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}

// Validar email
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar contraseña
function passwordValida(password) {
  return password.length >= 6;
}

// Función principal de registro
function GuardarUsuarios() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const mensajeDiv = document.getElementById('mensaje');

  // Validaciones
  if (!nombre || !apellido || !celular || !email || !password) {
    mostrarMensaje(mensajeDiv, "Todos los campos son obligatorios", "error");
    return;
  }

  if (!emailValido(email)) {
    mostrarMensaje(mensajeDiv, "Email inválido", "error");
    return;
  }

  if (!passwordValida(password)) {
    mostrarMensaje(mensajeDiv, "La contraseña debe tener al menos 6 caracteres", "error");
    return;
  }

  // Verificar si el email ya existe
  if (baseDatos.some(user => user.email === email)) {
    mostrarMensaje(mensajeDiv, "Este email ya está registrado", "error");
    return;
  }

  // Crear usuario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    celular: celular,
    email: email,
    password: password,
    isAdmin: false,
    fechaRegistro: new Date().toLocaleDateString('es-CO')
  };

  baseDatos.push(nuevoUsuario);
  guardarEnStorage();

  mostrarMensaje(mensajeDiv, "¡Registro exitoso! Redirigiendo al login...", "success");
  limpiar();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

// Mostrar mensajes
function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = "alert alert-" + (tipo === "error" ? "danger" : "success");
  elemento.style.display = "block";
  setTimeout(() => {
    elemento.style.display = "none";
  }, 4000);
}

// Cargar datos al abrir la página
CargarDatos();
