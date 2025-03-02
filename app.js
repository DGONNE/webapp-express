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
