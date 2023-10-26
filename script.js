document.addEventListener("DOMContentLoaded", function() { // Espera a que el DOM esté cargado
    if(document.getElementById("pelis-lista")) { // Si estamos en la página de lista de películas
        fetchMovies(); // Cargamos las películas
    }

    const form = document.getElementById("info-pelis"); // Si estamos en la página de crear película
    if (form) { // Si existe el formulario
        form.addEventListener("submit", createMovie); // Agregamos el evento submit
    }
});

function fetchMovies() { // Función para cargar las películas
    fetch('/movies')
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            let html = '';
            if (data.length === 0) {
                html = '<p>No hay películas disponibles.</p>';
            } else {
                data.forEach(movie => {
                    html += `
                        <tr>
                            <td>${movie.name}</td>
                            <td>${movie.synopsis}</td>
                            <td>${movie.genre}</td>
                            <td>${movie.duration}</td>
                            <td>${movie.director}</td>
                            <td>${movie.actors}</td>
                        </tr>
                    `;
                });
            }
            document.getElementById("pelis-lista").innerHTML = html;
        });
}

function createMovie(event) { // Función para crear una película
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    const movieData = { // Creamos un objeto con los datos de la película
        name: document.getElementById("pelicula").value,
        synopsis: document.getElementById("sinopsis").value,
        genre: document.getElementById("genero").value,
        duration: document.getElementById("duracion").value,
        director: document.getElementById("director").value,
        actors: document.getElementById("actor").value
    };

    fetch('/movies', { // Hacemos la petición POST
        method: 'POST',
        body: JSON.stringify(movieData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            Swal.fire({
                icon: 'success',
                title: 'Listo',
                text: 'Película creada.',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Al crear la película.'
            });
        }
    });
}