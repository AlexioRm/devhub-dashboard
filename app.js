class Proyecto {
  constructor(nombre, estado, fecha, tecnologias) {
    this.nombre = nombre;
    this.estado = estado;
    this.fecha = fecha;
    this.tecnologias = tecnologias;
  }

  crearCard() {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${this.nombre}</h3>
      <p><strong>Estado:</strong> ${this.estado}</p>
      <p><strong>Última actualización:</strong> ${this.fecha}</p>
      <p><strong>Tecnologías:</strong> ${this.tecnologias.join(", ")}</p>
    `;
    card.addEventListener("click", () => {
      alert(`Proyecto: ${this.nombre}\nTecnologías: ${this.tecnologias.join(", ")}`);
    });
    return card;
  }
}

const contenedor = document.getElementById("proyectos");
const botones = document.querySelectorAll(".filtros button");
let proyectos = [];
let filtroActual = localStorage.getItem("filtro") || "Todos";

async function cargarProyectos() {
  const resp = await fetch("projects.json");
  const datos = await resp.json();
  // Convertir cada objeto JSON en una instancia de Proyecto
  proyectos = datos.map(p => new Proyecto(p.nombre, p.estado, p.fecha, p.tecnologias));
  mostrarProyectos(filtroActual);
}

function mostrarProyectos(estado) {
  contenedor.innerHTML = "";
  const filtrados = estado === "Todos" ? proyectos : proyectos.filter(p => p.estado === estado);
  filtrados.forEach(p => contenedor.appendChild(p.crearCard()));
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    filtroActual = boton.dataset.estado;
    localStorage.setItem("filtro", filtroActual);
    mostrarProyectos(filtroActual);
  });
});

cargarProyectos();


