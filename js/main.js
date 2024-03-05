/* ================== Menú  - y Menú Hambburguesa  ================ */
const nav_header = document.getElementById("nav-header");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

const menuInicio = document.getElementById("menu-inicio");
const menuBalance = document.getElementById("menu-balance");
const menuCategorias = document.getElementById("menu-categorias");
const menuReportes = document.getElementById("menu-reportes");

abrir.addEventListener("click", () => {
	nav_header.classList.remove("hidden");
	cerrar.classList.remove("hidden");
	abrir.classList.add("hidden");
});

function cerrarNav() {
	nav_header.classList.add("hidden");
	cerrar.classList.add("hidden");
	abrir.classList.remove("hidden");
}

cerrar.addEventListener("click", cerrarNav);
menuInicio.addEventListener("click", cerrarNav);
menuBalance.addEventListener("click", cerrarNav);
menuCategorias.addEventListener("click", cerrarNav);
menuReportes.addEventListener("click", cerrarNav);

const contenedor_menuInicio = document.getElementById("cont-menu-inicio");
const contenedor_menuBalance = document.getElementById("cont-menu-balance");
const contenedor_menuCategorias = document.getElementById("cont-categorias");
const contenedor_menuReportes = document.getElementById("cont-menu-reportes");

function mostrar(mostrar) {
	contenedor_menuInicio.classList.add("ocultar");
	contenedor_menuBalance.classList.add("ocultar");
	contenedor_menuCategorias.classList.add("ocultar");
	contenedor_menuReportes.classList.add("ocultar");

	mostrar.classList.remove("ocultar");
}

menuInicio.addEventListener("click", () => {
	mostrar(contenedor_menuInicio);
});

menuBalance.addEventListener("click", () => {
	mostrar(contenedor_menuBalance);
});

menuCategorias.addEventListener("click", () => {
	mostrar(contenedor_menuCategorias);
});

menuReportes.addEventListener("click", () => {
	mostrar(contenedor_menuReportes);
	//mostrarReportes(); /* ver en scriptReportes.js */
});

/* ------------------------------------------------------------------------------------------------ */

/* ======================== CLARO - OSCURO ========================  */
const btn_claro_oscuro = document.getElementById("btn-claro-oscuro");
const imagenes = document.getElementsByClassName("img-js");

function ponerSacarGris(porc) {
	for (let i = 0; imagenes.length; i++) {
		imagenes[i].style.filter = `grayscale(${porc})`;
	}
}

btn_claro_oscuro.addEventListener("click", () => {
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			document.documentElement.getAttribute("data-theme-color") === "dark")
	) {
		btn_claro_oscuro.innerHTML = `<i class="fa-solid fa-moon"></i>`; // pone luna
		document.documentElement.setAttribute("data-theme-color", "light");
		localStorage.theme = "light"; //PASAR A claro
		ponerSacarGris(0);
	} else {
		btn_claro_oscuro.innerHTML = `<i class="fa-regular fa-sun"></i>`; //poner SOL
		document.documentElement.setAttribute("data-theme-color", "dark");
		localStorage.theme = "dark"; //pasar a oscuro
		ponerSacarGris(100);
	}
});

function modoClaroOscuro() {
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			document.documentElement.getAttribute("data-theme-color") === "dark")
	) {
		btn_claro_oscuro.innerHTML = `<i class="fa-regular fa-sun"></i>`; //pone SOL
		document.documentElement.setAttribute("data-theme-color", "dark"); //veeeer
		ponerSacarGris(100);
	} else {
		btn_claro_oscuro.innerHTML = `<i class="fa-solid fa-moon"></i>`; //pone LUNA
		document.documentElement.setAttribute("data-theme-color", "light"); //veeerr
		ponerSacarGris(0);
	}
}
/* ------------------------------------------------------------------------------------------------ */

/* ================================================================================================*/
function funcionesAEjecutar() {
	modoClaroOscuro();
}
/* Cuando se termina de cargar la página  */
window.onload = funcionesAEjecutar;
