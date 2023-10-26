$(document).ready(function() {
    if($("form").length){
        $('#listar-btn').on('click', function() {
            window.location.href = "index.html";
        });
        $("form").on('submit', function(event) {
            event.preventDefault();

            if (this.checkValidity() === false) {
                event.stopPropagation();
            } else {
                const movieData = {
                    name: $('#pelicula').val(),
                    synopsis: $('#sinopsis').val(),
                    genre: $('#genero').val(),
                    duration: $('#duracion').val(),
                    director: $('#director').val(),
                    actors: $('#actor').val()
                };

                $.ajax({
                    url: 'http://localhost:3000/movies?token=123', //URL de donde se obtendrán los datos
                    method: 'POST',
                    data: JSON.stringify(movieData),
                    contentType: 'application/json',
                    success: function(response) {
                        alert('Tu película se agrego correctamente.');
                        $("form")[0].reset();
                    },
                    error: function(error) {
                        console.error('ERROR:', error);
                        alert('ERROR. Intenta de nuevo.');
                    }
                });
            }
            $(this).addClass('was-validated');
        });
    } else {
        $('#link').on('click', function() {
            window.location.href = "agregar.html";
        });
        $.ajax({
            url: 'http://localhost:3000/movies?token=123', //URL de donde se obtendrán los datos
            method: 'GET',
            success: function(response) {
                let cont = 0;
                response.forEach(function(movie) {
                    cont++;
                    // Crea una fila para cada película
                    const listaPelis = ` 
                        <tr>
                            <td>${movie.name}</td>
                            <td>${movie.synopsis}</td>
                            <td>${movie.genre}</td>
                            <td>${movie.duration}</td>
                            <td>${movie.director}</td>
                            <td>${movie.actors}</td>
                        </tr>
                    `;
                    $('#pelis-lista').append(listaPelis);
                });
            },
            error: function(error) { // Si hay algún error, despliega un mensaje en la consola
                console.error('ERROR:', error);
                alert('ERROR al cargar las películas. Intenta de nuevo.');
            }
        });
    }
});
