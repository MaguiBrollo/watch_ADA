/* ============== NUEVA CATEGORIA ============= */
const categ_agregar = document.getElementById("categ-agregar");

categ_agregar.addEventListener("click", () => {
	registrarCategoria();
});

// Agrega una nueva categoría
let registrarCategoria = async () => {
	let categoria = {};

	
   categoria.nombre = (document.getElementById("categ_nombre").value).toUpperCase();
	const peticion = await fetch("http://localhost:8080/api_watch/crear", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(categoria),
	});
};
