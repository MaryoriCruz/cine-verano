
// POST: esta peticion sirve para AGREGAR
async function createMovie(newMovie) {
const response = await fetch("http://localhost:3001/movies", {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
});

if (response.ok) {
    await printMovies(); // Actualiza la lista en pantalla
}
}

// Capturar el formulario y enviar datos
async function sendFormData(){

const title = document.getElementById("title").value;
const actors = document.getElementById("actors").value;
const synopsis = document.getElementById("synopsis").value;
const genre = document.getElementById("genre").value;
const rating = document.getElementById("rating").value;
const imageUrl = document.getElementById("imageUrl").value;

const newMovie = {
    title,
    actors,
    synopsis,
    genre,
    rating,
    imageUrl, //Agregado último
};

    await createMovie(newMovie);
} 
document.getElementById("MovieForm").addEventListener("submit", function (event) {
event.preventDefault();
sendFormData()
event.target.reset();
});

//GET: obtener datos
async function getMovies(){
const response = await fetch("http://localhost:3001/movies", {
    method: "GET", 
    headers: {
        'Content-Type': 'application/json'
    }
})
const movieData = await response.json()
console.log(movieData)
return movieData
}
getMovies()
function updateMovie(id, editedMovie){
}

//DELETE: elimina datos
async function deleteMovie(id){
const response = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE", 
    headers: {
        'Content-Type': 'application/json'
    }
})
if(response.ok){
    await printMovies()
}
}

//IMPRIMIR- print
let moviesContainer = document.getElementById("movie-grid");
async function printMovies(){ 
    let movies = await getMovies(); 
    moviesContainer.innerHTML = ""; // Limpia el contenedor

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.style.backgroundImage = `url('${movie.imageUrl}')`; //Aqui incluimos nuestra imagen de fondo
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.color = "white";


        card.innerHTML = `
        <div class="overlay">
            <h2>${movie.title}</h2>
            <p><strong>Actores:</strong> ${movie.actors}</p>
            <p><strong>Sinopsis:</strong> ${movie.synopsis}</p>
            <p><strong>Género:</strong> ${movie.genre}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
            <button onclick="editMovie('${movie.id}', '${movie.title}', '${movie.actors}', '${movie.synopsis}', '${movie.genre}', '${movie.rating}')">Editar</button>
            <div>
            `;

        moviesContainer.appendChild(card);
    });
    return moviesList
}

//PUT: sirve para actualizar datos

async function updateMovie(id, editedMovie) {
  const response = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedMovie)
  });

  if (response.ok) {
    await printMovies(); // Refresca la lista en pantalla
  }
}

function editMovie(id, currentTitle, currentActors, currentSynopsis, currentGenre, currentRating) {
  const newTitle = prompt("Nuevo título:", currentTitle);
  const newActors = prompt("Nuevo actors:", currentActors);
  const newSynopsis = prompt("Nueva synopsis:", currentSynopsis);
  const newGenre = prompt("Nuevo genre:", currentGenre);
  const newRating = prompt("Nuevo rating:", currentRating);
  

  const editedMovie = {
    title: newTitle,
    actors: newActors,
    synopsis: newSynopsis,
    genre: newGenre,
    rating: newRating
  };

  updateMovie(id, editedMovie);
}
