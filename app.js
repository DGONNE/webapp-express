const express = require("express");
const app = express();
const filmsRouter = require("./routes/films");

app.use(express.json());

// Rotte principali
app.use("/films", filmsRouter);

// Servire le immagini delle copertine (cartella movies_cover)
app.use("/covers", express.static("movies_cover"));

app.listen(3000, () => {
  console.log("✅ Server in ascolto su http://localhost:3000");
});

// Aggiunge una nuova recensione al film con ID = id
app.post("/films/:id/reviews", (req, res) => {
  const filmId = req.params.id;
  const { review_text, rating } = req.body;

  const query = `
        INSERT INTO reviews (film_id, review_text, rating) 
        VALUES (?, ?, ?)
    `;

  db.query(query, [filmId, review_text, rating], (err, result) => {
    if (err) {
      console.error("Errore nell'inserimento recensione:", err);
      return res.status(500).json({ error: "Errore server" });
    }
    res.status(201).json({ message: "Recensione salvata con successo!" });
  });
});
