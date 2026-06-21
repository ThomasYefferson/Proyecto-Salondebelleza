// ===== INICIALIZACIÓN DE DATOS POR DEFECTO =====
// Ejecutar una sola vez para cargar datos iniciales

function inicializarDatos() {
  // Crear usuario admin de prueba
  if (!localStorage.getItem("usuarios")) {
    const usuariosDefault = [
      {
        id: 1000,
        nombre: "Angie",
        apellido: "Fashion",
        celular: "3215353153",
        email: "admin@angiefashion.com",
        password: "admin123",
        isAdmin: true,
        fechaRegistro: "2024-01-01"
      }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosDefault));
    console.log("✓ Usuario admin creado: admin@angiefashion.com / admin123");
  }

  // Crear promociones por defecto
  if (!localStorage.getItem("promociones")) {
    const promosDefault = [
      {
        id: 1,
        nombre: "Semipermanente manos",
        precio: 30000,
        imagen: "images/promociones1.jpeg",
        descripcion: "Uñas semipermanentes en manos",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 2,
        nombre: "Semipermanente pies",
        precio: 30000,
        imagen: "images/promociones2.jpeg",
        descripcion: "Uñas semipermanentes en pies",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 3,
        nombre: "Semipermanente natural",
        precio: 35000,
        imagen: "images/promociones3.jpeg",
        descripcion: "Semipermanente con diseño natural",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 4,
        nombre: "Uñas postizas",
        precio: 45000,
        imagen: "images/promociones4.jpeg",
        descripcion: "Uñas postizas acrílicas",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 5,
        nombre: "Polygel corto",
        precio: 65000,
        imagen: "images/promociones5.jpeg",
        descripcion: "Polygel en extensión corta",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 6,
        nombre: "Polygel largo",
        precio: 75000,
        imagen: "images/promociones6.jpeg",
        descripcion: "Polygel en extensión larga",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 7,
        nombre: "Maquillaje profesional",
        precio: 45000,
        imagen: "images/promociones9.jpeg",
        descripcion: "Maquillaje completo profesional",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 8,
        nombre: "Look completo",
        precio: 28000,
        imagen: "images/promociones10.jpeg",
        descripcion: "Servicio de look completo",
        fechaCreacion: "2024-01-01"
      },
      {
        id: 9,
        nombre: "Cepillado",
        precio: 35000,
        imagen: "images/promociones11.jpeg",
        descripcion: "Cepillado y styling",
        fechaCreacion: "2024-01-01"
      }
    ];
    localStorage.setItem("promociones", JSON.stringify(promosDefault));
    console.log("✓ 9 promociones por defecto creadas");
  }
}

// Ejecutar al cargar la página (solo una vez)
document.addEventListener('DOMContentLoaded', inicializarDatos);
