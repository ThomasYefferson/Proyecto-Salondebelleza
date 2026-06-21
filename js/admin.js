// ===== PANEL ADMINISTRATIVO CON localStorage =====

let promociones = [];
let usuarios = [];
let editandoPromoId = null;

// Cargar datos
function cargarDatos() {
  const promosStorage = localStorage.getItem("promociones");
  promociones = promosStorage ? JSON.parse(promosStorage) : [];

  const usuariosStorage = localStorage.getItem("usuarios");
  usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];
}

// Verificar acceso admin
function verificarAcceso() {
  const sesion = localStorage.getItem("sesionActual");
  
  if (!sesion) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(sesion);
  
  if (!usuario.isAdmin) {
    alert("No tienes permiso para acceder aquí");
    window.location.href = "index.html";
    return;
  }

  document.getElementById('infoAdmin').textContent = `Bienvenido, ${usuario.nombre} (Administrador)`;
}

// Guardar promoción
document.getElementById('promoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('promoNombre').value.trim();
  const precio = parseInt(document.getElementById('promoPrecio').value);
  const imagen = document.getElementById('promoImagen').value.trim();
  const descripcion = document.getElementById('promoDescripcion').value.trim();
  const mensajeDiv = document.getElementById('promoMensaje');

  if (!nombre || !precio) {
    mostrarMensaje(mensajeDiv, "Nombre y precio son obligatorios", "error");
    return;
  }

  if (editandoPromoId) {
    // Actualizar
    const index = promociones.findIndex(p => p.id === editandoPromoId);
    if (index !== -1) {
      promociones[index] = {
        id: editandoPromoId,
        nombre,
        precio,
        imagen,
        descripcion,
        fechaActualizacion: new Date().toLocaleDateString('es-CO')
      };
      mostrarMensaje(mensajeDiv, "Promoción actualizada", "success");
      editandoPromoId = null;
    }
  } else {
    // Crear nueva
    const nuevaPromo = {
      id: Date.now(),
      nombre,
      precio,
      imagen,
      descripcion,
      fechaCreacion: new Date().toLocaleDateString('es-CO')
    };
    promociones.push(nuevaPromo);
    mostrarMensaje(mensajeDiv, "Promoción agregada", "success");
  }

  localStorage.setItem("promociones", JSON.stringify(promociones));
  limpiarFormPromo();
  mostrarPromociones();
});

// Limpiar formulario promoción
function limpiarFormPromo() {
  document.getElementById('promoForm').reset();
  editandoPromoId = null;
  document.querySelector('#promoForm button').textContent = "Guardar Promoción";
}

// Mostrar promociones
function mostrarPromociones() {
  const listDiv = document.getElementById('promoList');

  if (promociones.length === 0) {
    listDiv.innerHTML = '<div class="no-content">No hay promociones registradas</div>';
    return;
  }

  listDiv.innerHTML = promociones.map(promo => `
    <div class="promo-item">
      <h5>${promo.nombre}</h5>
      <p>$${promo.precio.toLocaleString('es-CO')}</p>
      ${promo.descripcion ? `<p style="color: var(--muted); font-size: 0.9rem; font-weight: normal;">${promo.descripcion}</p>` : ''}
      ${promo.imagen ? `<img src="${promo.imagen}" alt="${promo.nombre}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin: 0.5rem 0;">` : ''}
      <div class="promo-actions">
        <button class="btn-small btn-edit" onclick="editarPromo(${promo.id})">Editar</button>
        <button class="btn-small btn-delete" onclick="eliminarPromo(${promo.id})">Eliminar</button>
      </div>
    </div>
  `).join('');
}

// Editar promoción
function editarPromo(id) {
  const promo = promociones.find(p => p.id === id);
  if (!promo) return;

  document.getElementById('promoNombre').value = promo.nombre;
  document.getElementById('promoPrecio').value = promo.precio;
  document.getElementById('promoImagen').value = promo.imagen || '';
  document.getElementById('promoDescripcion').value = promo.descripcion || '';

  editandoPromoId = id;
  document.querySelector('#promoForm button').textContent = "Actualizar Promoción";

  // Scroll al formulario
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Eliminar promoción
function eliminarPromo(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta promoción?')) {
    promociones = promociones.filter(p => p.id !== id);
    localStorage.setItem("promociones", JSON.stringify(promociones));
    mostrarPromociones();
  }
}

// Mostrar usuarios
function mostrarUsuarios() {
  const tableBody = document.getElementById('usersTable');

  if (usuarios.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>';
    return;
  }

  tableBody.innerHTML = usuarios.map(user => `
    <tr>
      <td>${user.nombre} ${user.apellido}</td>
      <td>${user.email}</td>
      <td>${user.celular}</td>
      <td>${user.fechaRegistro}</td>
      <td>${user.isAdmin ? '<span class="badge-admin">ADMIN</span>' : 'Usuario'}</td>
      <td>
        <button class="btn-small btn-edit" onclick="hacerAdmin(${user.id})" ${user.isAdmin ? 'disabled' : ''}>
          ${user.isAdmin ? 'Es Admin' : 'Hacer Admin'}
        </button>
      </td>
    </tr>
  `).join('');
}

// Hacer usuario admin
function hacerAdmin(id) {
  if (confirm('¿Convertir este usuario a administrador?')) {
    const user = usuarios.find(u => u.id === id);
    if (user) {
      user.isAdmin = true;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
    }
  }
}

// Mostrar mensajes
function mostrarMensaje(elemento, texto, tipo) {
  elemento.innerHTML = `<div class="alert alert-${tipo === "error" ? "danger" : "success"} alert-custom">${texto}</div>`;
  setTimeout(() => {
    elemento.innerHTML = "";
  }, 3000);
}

// Cerrar sesión
function cerrarSesionAdmin() {
  if (confirm('¿Cerrar sesión?')) {
    localStorage.removeItem("sesionActual");
    window.location.href = "index.html";
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  verificarAcceso();
  cargarDatos();
  mostrarPromociones();
  mostrarUsuarios();
});
