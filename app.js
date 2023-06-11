require("dotenv").config();
const express = require("express");
const { hashPassword, verifyPassword, verifyToken } = require("./auth"); // don't forget to import
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post("/api/users", hashPassword, usersHandlers.postUsers);

app.post(
  "/api/login",

  usersHandlers.getUserByEmailWithPasswordAndPassToNext,

  verifyPassword
);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, usersHandlers.updateUsers);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUsers);
