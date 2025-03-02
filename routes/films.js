const express = require("express");
const router = express.Router();
const connection = require("../db");

// Rotta: lista di tutti i film
router.get("/", (req, res) => {
  const query = "SELECT * FROM movies";
  connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore nel recupero dei film", details: err.message });
    }
    res.json(results);
  });
});

// Rotta: dettaglio di un singolo film + recensioni
router.get("/:id", (req, res) => {
  const filmId = req.params.id;

  const query = `
        SELECT * FROM movies WHERE id = ?;
        SELECT * FROM reviews WHERE movie_id = ?;
    `;

  connection.query(query, [filmId, filmId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore nel recupero del film", details: err.message });
    }

    if (results[0].length === 0) {
      return res.status(404).json({ error: "Film non trovato" });
    }

    const film = results[0][0]; // Dati film
    film.reviews = results[1]; // Lista recensioni
    film.cover_url = `/covers/${film.cover_image}`; // URL immagine di copertina

    res.json(film);
  });
});

module.exports = router;
