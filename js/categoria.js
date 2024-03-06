/* ============== LISTAR CATEGORIA ============= */
//Busca listado de categorías
function listarCategorias() {
	let respuestaFetch = fetch("http://localhost:8080/api_watch/listar", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json; charset=utf-8",
		},
	});

	respuestaFetch
		.then((respuesta) => {
			return respuesta.json();
		})
		.then((data) => {
			mostrarCategorias(data);
		})
		.catch((error) => {
			//atrapa error
			console.log("ERROR de LISTAR Categorías: ", error);
		});
}

//------------------------------------
const categ_tabla_listado = document.getElementById("categ-tabla-listado");
function mostrarCategorias(listCat) {
	for (const cat of listCat) {
		categ_tabla_listado.innerHTML += `
		<div class="categ-tabla-fila">
				<div class="categ-tabla-nombres">${cat.nombre}</div>
				<div class="categ-tabla-iconos">
					<span class="material-symbols-outlined"> edit </span>
					<span class="material-symbols-outlined"> delete </span>
				</div>
		</div>
		`;
	}
}

/* ============== NUEVA CATEGORIA ============= */
const categ_agregar = document.getElementById("categ-agregar");

categ_agregar.addEventListener("click", () => {
	registrarCategoria();
	console.log("paso el registrar");
	listarCategorias(); //actualizar listado
});

// Agrega una nueva categoría
let registrarCategoria = async () => {
	let categoria = {};

	categoria.nombre = document
		.getElementById("categ_nombre")
		.value.toUpperCase();

	try {
		let peticion = await fetch("http://localhost:8080/api_watch/crear", {
			method: "POST",
			//mode: "no-cors",
			headers: {
				Accept: "application/json",
				// Origin: "http://127.0.0.1:5500",
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(categoria),
		});
	} catch (error) {
		console.log("Error de CREAR categoría: ", error); //para ver error
	}
};

/* ======================================================== */
/* Funciones que deben ejecutarse al cargar menú Categorías */
function funcionesCategorias() {
	//la llaman desde main.js
	console.log("entro");
	listarCategorias();
}
