const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.models");

app.use(express.json());

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
  res.send("Movies Backend Running...")
})

//Read movie by title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {throw error}
}

app.get("/movies/:title", async (req, res)=>{
  try {
    const movie = await readMovieByTitle(req.params.title);
    if(movie) {
      res.json(movie);
    } else {
      res.status(404).json({error: "Movie Not Found!"})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch data."});
  }
})

//Read all movies
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {}
}
app.get("/movies", async (req, res)=>{
  try {
    const movies = await readAllMovies();
    if(movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({error: "No Movies Found!"})
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
})

//Read Movie by director name.
async function readMovieByDirectorName(movieDirector){
    try {
        const movieByDirector = await Movie.find({director: movieDirector})
        return movieByDirector;
    } catch (error) {
        throw error;
    }
}
app.get("/movies/director/:directorName", async (req, res)=>{
  try {
    const movies = await readMovieByDirectorName(req.params.directorName);
    if(movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({error: "Movie Not Found!"})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch movies."})
  }
})

//read movies by genre.
async function readMoviesByGenre(movieGenre) {
try {
  const movieByGenre = await Movie.find({genre: movieGenre})
  return movieByGenre;
} catch (error) {
  throw error;
}
}
app.get("/movies/genre/:genreName", async (req, res) =>{
  try {
    const movies = await readMoviesByGenre(req.params.genreName)
    if(movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({error: "Movies not Found!"});
    }
  } catch (error) {
    res.status(500).json({error: "Failed to fetch movies."})
  }
})

app.listen(3000, ()=> console.log("Server is running on PORT 3000"))

//route to add new movie.
app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Failed to add movie" });
  }
});


// readMovieByTitle("Lagaan");
// readAllMovies();
// readMovieByDirectorName("Kabir Khan");
