import express, { Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
config()

import { createDeckController, deleteDeckController, getDeckController, getDecksController } from "./controllers/deck.controller"
import { createCardController, getCardController } from "./controllers/card.controller"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// decks route
app.get("/decks", getDecksController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

// cards route
app.post("/decks/:deckId/cards", createCardController)
app.get("/decks/:deckId/cards", getCardController);



mongoose.connect(
  process.env.MONGO_URL!
).then(()=> {
    console.log(`App listening on port ${PORT}`)
    app.listen(PORT)
})
