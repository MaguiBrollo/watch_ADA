// ________________________________________________
// Función que inicializa las fechas en los filtros
// ------------------------------------------------
function inicializarFechaInput(id_del_input, que_hago) {
	var fecha;
	if (que_hago === "restarMes") {
		let fechaMiliseg = new Date().getTime();
		fecha = new Date(fechaMiliseg - 2629800000);
	} else {
		fecha = new Date();
	}

	var fecParaInput = fecha.getFullYear() + "-";

	fecha.getMonth() + 1 < 10
		? (fecParaInput += "0" + (fecha.getMonth() + 1) + "-")
		: (fecParaInput += fecha.getMonth() + 1 + "-");
	fecha.getDate() < 10
		? (fecParaInput += "0" + fecha.getDate())
		: (fecParaInput += fecha.getDate());
	document
		.getElementById(`${id_del_input}`)
		.setAttribute("value", fecParaInput);
}

function inicializarFechas() {
	inicializarFechaInput("filtro-fecha-desde", "restarMes");
	inicializarFechaInput("filtro-fecha-hasta", "noRestarMes");
}

// ___________________________________
// Evento que oculta todos los filtros
// -----------------------------------
const ocultar_filtros = document.getElementById("ocultar-filtros");
const contenedor_filtros = document.getElementById("contenedor-filtros");

ocultar_filtros.addEventListener("click", () => {
	contenedor_filtros.classList.toggle("balance-ocultar");
	if (contenedor_filtros.classList.contains("balance-ocultar")) {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye"></i><p class=""> Mostrar Filtros </p>`;
	} else {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye-slash"></i><p class=""> Ocultar Filtros </p>`;
	}
});

/* ======================================================== */
/* Funciones que deben ejecutarse al cargar menú Balance */
//(desde main.js)
function funcionesBalance() {
	inicializarFechas();
}
