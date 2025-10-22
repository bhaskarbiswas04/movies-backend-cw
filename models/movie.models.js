const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    genre: [{
      type: String,
      enum: [
        "Action",
        "Drama",
        "Comedy",
        "Romance",
        "Triller",
        "Fantasy",
        "Sci-Fi",
        "Horror",
        "Sports",
        "Musical",
        "Other",
      ],
    }],
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    plot: {
      type: String,
    },
    awards: String,
    posterUrl: String,
    trailerUrl: String,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", MovieSchema)
module.exports = Movie;