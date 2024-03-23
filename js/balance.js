// ===================================================
// Inicializa fechas en los filtros y Nueva operación
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
	inicializarFechaInput("fecha-oper-input", "noRestarMes");
}

// ===================================================
// Muestra/Oculta filtros
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

// ===================================================
// Muestra Nueva Operación
const btn_nueva_oper = document.getElementById("btn-nueva-oper");
const cont_nueva_oper = document.getElementById("cont-nueva-oper");
//const contenedor_menuBalance = document.getElementById("cont-menu-balance");

btn_nueva_oper.addEventListener("click", () => {
	contenedor_menuBalance.classList.add("ocultar"); //viene de main.js
	cont_nueva_oper.classList.remove("ocultar");
});

const btn_agregar_oper = document.getElementById("btn-agregar-oper");
const btn_cancelar_oper = document.getElementById("btn-cancelar-oper");

btn_agregar_oper.addEventListener("click", ()=>{
	contenedor_menuBalance.classList.remove("ocultar"); //viene de main.js
	cont_nueva_oper.classList.add("ocultar");
})

btn_cancelar_oper.addEventListener("click", () => {
	contenedor_menuBalance.classList.remove("ocultar"); //viene de main.js
	cont_nueva_oper.classList.add("ocultar");
});

// ======================================================== //
// Funciones que deben ejecutarse al cargar menú Balance
//(desde main.js)
function funcionesBalance() {
	inicializarFechas();
}
