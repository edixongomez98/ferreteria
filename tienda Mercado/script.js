const productos = [
  { id: 1, nombre: "Taladro Percutor 1/2 Inalambrico Total 66nm +50 Acc Brushles", precio:400000, img: "img/1.jpg" },
  { id: 2, nombre: "Pistola Para Pintar Total Utt3506 800ml 450w Agua/aceite", precio: 150000, img: "img/2.jpg" },
  { id: 3, nombre: "Pulidora 4 1/2 Industrial Total UTG10711556 750w Super Select", precio: 170000, img: "img/3.jpg" },
  { id: 4, nombre: "Lijadora De Palma Industrial 240w Total, Incluye 5 Lijas Color Turquesa Frecuencia 50 H", precio: 190000, img: "img/4.jpg" },
  { id: 5, nombre: "Lijadora De Palma Industrial 240w Total, Incluye 5 Lijas Color Turquesa Frecuencia 50 H", precio: 190000, img: "img/5.jpg" },
  { id: 6, nombre: "Maleta de herramientas TOTAL original.", precio: 58000, img: "img/6.jpg" },
];

let carrito = [];
const catalogo = document.getElementById("catalogo");
const carritoLista = document.getElementById("carrito-lista");
const totalElem = document.getElementById("total");
const pagarBtn = document.getElementById("pagar-btn");
const botonCarrito = document.getElementById("boton-carrito");
const carritoPanel = document.getElementById("carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const whatsappBtn = document.getElementById("whatsapp-btn");

// Mostrar productos
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio.toLocaleString()}</p>
    <div class="agregado-exito">
      <button onclick="agregarAlCarrito(${p.id}, this)">Agregar al carrito</button>
      <span class="chulito">✓</span>
    </div>
  `;
  catalogo.appendChild(div);
});

function agregarAlCarrito(id, boton) {
  const index = carrito.findIndex(item => item.producto.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    const producto = productos.find(p => p.id === id);
    carrito.push({ producto, cantidad: 1 });
  }
  mostrarCarrito();

  // Animación de chulito ✓
  const contenedor = boton.parentElement;
  const chulito = contenedor.querySelector(".chulito");
  chulito.classList.add("mostrar");
  setTimeout(() => chulito.classList.remove("mostrar"), 1000);
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex(item => item.producto.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach(({ producto, cantidad }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} x${cantidad} - $${(producto.precio * cantidad).toLocaleString()}
      <button onclick="eliminarDelCarrito(${producto.id})" style="margin-left:10px; background:red;">Eliminar</button>
    `;
    carritoLista.appendChild(li);
    total += producto.precio * cantidad;
  });
  totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

// Abrir/cerrar carrito
botonCarrito.addEventListener("click", () => {
  carritoPanel.classList.add("abierto");
});
cerrarCarrito.addEventListener("click", () => {
  carritoPanel.classList.remove("abierto");
});

// Botón de Mercado Pago (sin WhatsApp automático)
pagarBtn.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !direccion || !telefono) {
    alert("Por favor completa todos los datos del formulario.");
    return;
  }

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  alert("Serás redirigido a Mercado Pago para completar tu pago.");
  window.open("https://link.mercadopago.com.co/tugorra", "_blank");
});

// Botón de WhatsApp manual
whatsappBtn.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !direccion || !telefono) {
    alert("Completa todos tus datos antes de enviar el pedido.");
    return;
  }

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos primero.");
    return;
  }

  let mensaje = `Hola, hice una compra en TuGorra y este es mi pedido:%0A`;
  carrito.forEach(({ producto, cantidad }) => {
    mensaje += `- ${producto.nombre} x${cantidad} - $${(producto.precio * cantidad).toLocaleString()}%0A`;
  });
  let total = carrito.reduce((sum, { producto, cantidad }) => sum + producto.precio * cantidad, 0);
  mensaje += `%0ATotal: $${total.toLocaleString()}%0A`;
  mensaje += `%0ADatos del cliente:%0ANombre: ${nombre}%0ADirección: ${direccion}%0ACelular: ${telefono}`;

  const whatsappUrl = `https://wa.me/573122284474?text=${mensaje}`;
  window.open(whatsappUrl, "_blank");
});