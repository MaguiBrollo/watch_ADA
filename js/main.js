/* Por motivos de que SASS no trabaja correctamente en poner y sacar
la clase "ocultar", es que debo agregar esta función. 
md=768
*/
let md_px = getComputedStyle(document.documentElement).getPropertyValue("--md");

window.visualViewport.addEventListener("resize", () => {
	if (window.innerWidth >= `${md_px}`) {
		document.getElementById("nav-header").classList.remove("ocultar");
		document.getElementById("nav-header").classList.add("mostrar");
	} else {
		cerrarNav();
	}
});
//--------------------------------------------------------------------------

/* ================== Menú  - y Menú Hambburguesa  ================ */
const nav_header = document.getElementById("nav-header");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

function cerrarNav() {
	/* Este If es un parche porque con SASS no funciona bien el poner y sacar clases*/
	if (window.innerWidth < `${md_px}`) {
		console.log(window.innerWidth);
		nav_header.classList.remove("mostrar");
		nav_header.classList.add("ocultar");
		cerrar.classList.add("ocultar");
		abrir.classList.remove("ocultar");
	}
}
abrir.addEventListener("click", () => {
	nav_header.classList.remove("ocultar");
	nav_header.classList.add("mostrar");
	cerrar.classList.remove("ocultar");
	abrir.classList.add("ocultar");
});

cerrar.addEventListener("click", cerrarNav);

const menuInicio = document.getElementById("menu-inicio");
const menuBalance = document.getElementById("menu-balance");
const menuCategorias = document.getElementById("menu-categorias");
const menuReportes = document.getElementById("menu-reportes");

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
	cerrarNav();
	mostrar(contenedor_menuInicio);
});

menuBalance.addEventListener("click", () => {
	cerrarNav();
	mostrar(contenedor_menuBalance);
});

menuCategorias.addEventListener("click", () => {
	cerrarNav();
	mostrar(contenedor_menuCategorias);
	funcionesCategorias(); // ver categorias.js
});

menuReportes.addEventListener("click", () => {
	cerrarNav();
	mostrar(contenedor_menuReportes);
	//mostrarReportes(); /* ver en scriptReportes.js */
});

/* ------------------------------------------------------------------------------------------------ */

/* ======================== CLARO - OSCURO ========================  */
const btn_claro_oscuro = document.getElementById("btn-claro-oscuro");
const imagenes = document.getElementsByClassName("img-js");

function ponerSacarGris(porc) {
	for (let i = 0; i < imagenes.length; i++) {
		imagenes[i].style.filter = `grayscale(${porc})`;
	}
}

btn_claro_oscuro.addEventListener("click", () => {
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			document.documentElement.getAttribute("data-theme-color") === "dark")
	) {
		btn_claro_oscuro.innerHTML = `<span class="material-symbols-outlined"> dark_mode </span>`; // pone luna
		document.documentElement.setAttribute("data-theme-color", "light");
		localStorage.theme = "light"; //PASAR A claro
		ponerSacarGris(0);
	} else {
		btn_claro_oscuro.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`; //poner SOL
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
		btn_claro_oscuro.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`; //pone SOL
		document.documentElement.setAttribute("data-theme-color", "dark"); //veeeer
		ponerSacarGris(100);
	} else {
		btn_claro_oscuro.innerHTML = `<span class="material-symbols-outlined"> dark_mode </span>`; //pone LUNA
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
