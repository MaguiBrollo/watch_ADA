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
			console.log("ERROR - LISTAR Categorías: ", error);
		});
}

//------------------------------------
const categ_tabla_listado = document.getElementById("categ-tabla-listado");
function mostrarCategorias(listCat) {
	categ_tabla_listado.innerHTML = "";
	if (listCat.length === 0) categ_tabla_listado.innerHTML += `¡Sin Categorías!`;
	else {
		for (const cat of listCat) {
			categ_tabla_listado.innerHTML += `
		<div class="categ-tabla-fila">
				<div class="categ-tabla-nombres">${cat.id}-${cat.nombre}</div>
				<div class="categ-tabla-iconos">

					<span class="material-symbols-outlined edi"> edit </span>
					
					<span onClick="borrarCategoria(${cat.id})" class="material-symbols-outlined del"> delete </span>
					
				</div>
		</div>
		`;
		}
	}
}

let borrarCategoria = async (idCat) => {
	try {
		const peticion = await fetch("http://localhost:8080/api_watch/" + idCat, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
		});
	} catch (error) {
		console.log("ERROR - ELIMINAR Categoría: ", error); //para ver error
	}
	listarCategorias();
};

/* ============== NUEVA CATEGORIA ============= */
const categ_agregar = document.getElementById("categ-agregar");

categ_agregar.addEventListener("click", () => {
		registrarCategoria();
});

// Agrega una categoría
let registrarCategoria = async () => {
	let categoria = {};

	categoria.nombre = document
		.getElementById("categ_nombre")
		.value.toUpperCase();

	try {
		let peticion = await fetch("http://localhost:8080/api_watch/crear", {
			method: "POST",
			headers: {
				Accept: "application/json",

				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(categoria),
		});
	} catch (error) {
		console.log("ERROR - CREAR categoría: ", error); //para ver error
	}
	console.log("pasa por aquiiii")
	listarCategorias(); //actualizar listado
};

/* ======================================================== */
/* Funciones que deben ejecutarse al cargar menú Categorías */
//(desde main.js)
function funcionesCategorias() {
	listarCategorias();
}
