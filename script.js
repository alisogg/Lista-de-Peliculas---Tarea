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
                    name: $('#name').val(),
                    synopsis: $('#synopsis').val(),
                    genre: $('#genre').val(),
                    duration: $('#duration').val(),
                    director: $('#director').val(),
                    actors: $('#actors').val()
                };

                $.ajax({
                    url: 'http://localhost:3000/',
                    method: 'POST',
                    data: JSON.stringify(movieData),
                    contentType: 'application/json',
                    success: function(response) {
                        alert('Película registrada con éxito!');
                        $("form")[0].reset();
                    },
                    error: function(error) {
                        console.error('ERROR:', error);
                        alert('Al registrar la película.');
                    }
                });
            }
            $(this).addClass('was-validated');
        });
    } else { 
        $('#add-btn').on('click', function() {
            window.location.href = "agregar.html";
        });
        $.ajax({
            url: 'http://localhost:3000/', // Asegúrate de que esta sea la URL correcta para obtener los datos
            method: 'GET',
            success: function(response) {
                response.forEach(function(movie) {
                    const movieRow = `
                        <tr>
                            <td>${movie.name}</td>
                            <td>${movie.synopsis}</td>
                            <td>${movie.genre}</td>
                            <td>${movie.duration}</td>
                            <td>${movie.director}</td>
                            <td>${movie.actors}</td>
                        </tr>
                    `;
                    $('#pelis').append(movieRow);
                });
            },
            error: function(error) {
                console.error('ERROR:', error);
                alert('Hubo un error al cargar las películas. Inténtalo de nuevo.');
            }
        });
    }
});