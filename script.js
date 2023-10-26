$(document).ready(function() {
    if($("form").length){
        $('#listar-btn').on('click', function() { // Al hacer click en el botón de listar
            window.location.href = "index.html";  // Redireccionamos a la página de listar
        });
        $("form").on('submit', function(event) {
            event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

            if (this.checkValidity() === false) { // Si el formulario no es válido
                event.stopPropagation(); // Detenemos la propagación
            } else {
                const datosForm = { // Creamos un objeto con los datos del formulario
                    name: $('#name').val(),
                    synopsis: $('#synopsis').val(),
                    genre: $('#genre').val(),
                    duration: $('#duration').val(),
                    director: $('#director').val(),
                    actors: $('#actors').val()
                };

                $.ajax({ // Enviamos los datos al servidor
                    url: 'http://localhost:3000/movies',
                    method: 'POST', // Siempre que se envíen datos al servidor, se usa POST
                    data: JSON.stringify(datosForm), // Convertimos el objeto a un string
                    contentType: 'application/json', // Especificamos el tipo de contenido que se está enviando
                    success: function(response) {
                        alert('Se ha agregado tu película.'); // Si la solicitud es exitosa, mostramos un mensaje
                        $("form")[0].reset(); // Reseteamos el formulario
                    },
                    error: function(error) {
                        console.error('ERROR:', error);
                        alert('ERROR. Al registrar la película.');
                    }
                });
            }
            $(this).addClass('was-validated'); // Agregamos la clase was-validated para mostrar los mensajes de validación
        });
    } else { 
        $('#add-btn').on('click', function() { // Al hacer click en el botón de agregar
            window.location.href = "agregar.html"; // Redireccionamos a la página de agregar
        });
        $.ajax({
            url: 'http://localhost:3000/movies', // Asegúrate de que esta sea la URL correcta para obtener los datos
            method: 'GET', // Siempre que se obtengan datos del servidor, se usa GET
            success: function(response) {
                if (response.length === 0) {
                    $('#pelis-lista').html('<p>NO hay películas disponibles.</p>'); // Si no hay películas, mostramos un mensaje
                } else {
                response.forEach(function(movies) { // Recorremos el arreglo de películas
                    const agregarInfo = `
                        <tr>
                            <td>${movies.name}</td>
                            <td>${movies.synopsis}</td>
                            <td>${movies.genre}</td>
                            <td>${movies.duration}</td>
                            <td>${movies.director}</td>
                            <td>${movies.actors}</td>
                        </tr>
                    `;
                    $('#pelis').append(agregarInfo); // Agregamos la fila a la tabla
                });
            }
        },
            error: function(error) {
                console.error('ERROR:', error); // Si hay algún error en la solicitud, se mostrará aquí
            }
        });
    }
});