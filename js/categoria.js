// para traer las variables desde el CSS

let colRoj = getComputedStyle(document.documentElement).getPropertyValue(
	"--colRojo"
);

let colVer = getComputedStyle(document.documentElement).getPropertyValue(
	"--colVerde"
);

function mensaje_debajo_input(mensaje, color) {
	if (color === "ver")
		document.getElementById("mns-input-cat").style.color = `${colVer}`;
	else document.getElementById("mns-input-cat").style.color = `${colRoj}`;
	document.getElementById("mns-input-cat").innerHTML = `${mensaje}`;
}

/* ============================================ */
/* -- Limpia el Input cuando cancela Crear o Editar -- */
document.getElementById("categ-cancelar").addEventListener("click", () => {
	mensaje_debajo_input("Ingrese el nombre de la Categoría.", "ver");

	document.getElementById("categ-agregar").style.display = `flex`;
	document.getElementById("categ-editar").style.display = `none`;

	document.getElementById("categ_nombre").value = "";
});

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

	document.getElementById("categ_nombre").value = "";
	listarCategorias(); //actualizar listado
};

/* ============== LISTAR CATEGORIA ============= */
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

					<span onClick="editarCategoria(${cat.id})"  class="material-symbols-outlined edi"> edit </span>
					
					<span onClick="borrarCategoria(${cat.id})" class="material-symbols-outlined del"> delete </span>
					
				</div>
		</div>`;
		}
	}
}

/* ============== BORRAR CATEGORIA ============= */
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

/* ============== EDITAR CATEGORIA ============= */
let idCat_paraEditar;
function editarCategoria(idCat) {
	idCat_paraEditar = idCat;

	let respuestaFetch = fetch("http://localhost:8080/api_watch/" + idCat, {
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
			document.getElementById("categ-agregar").style.display = `none`;
			document.getElementById("categ-editar").style.display = `flex`;

			mensaje_debajo_input("EDITE el nombre de la Categoría.", "roj");
			document.getElementById("categ_nombre").value = data.nombre;
		})
		.catch((error) => {
			console.log("ERROR - Buscar una Categorías: ", error);
		});
}

// segundo deber guardar lo editado
const editar_categ = document.getElementById("categ-editar");

editar_categ.addEventListener("click", () => {
	guardarEditarCategoria(idCat_paraEditar);
});

// Agrega una categoría
let guardarEditarCategoria = async (id) => {
	let categoria = {};

	categoria.nombre = document
		.getElementById("categ_nombre")
		.value.toUpperCase();

	try {
		let peticion = await fetch("http://localhost:8080/api_watch/" + id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(categoria),
		});
	} catch (error) {
		console.log("ERROR - Guardar Editar categoría: ", error); //para ver error
	}

	document.getElementById("categ-agregar").style.display = `flex`;
	document.getElementById("categ-editar").style.display = `none`;
	document.getElementById("categ_nombre").value = "";
	mensaje_debajo_input("Ingrese el nombre de la Categoría.", "ver");
	listarCategorias(); //actualizar listado
};

/* ======================================================== */
/* Funciones que deben ejecutarse al cargar menú Categorías */
//(desde main.js)
function funcionesCategorias() {
	listarCategorias();
}
