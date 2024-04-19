import express, { Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
config()

import { createDeckController, deleteDeckController, getDecksController } from "./controllers/deck.controller"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.get("/decks", getDecksController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckId", deleteDeckController);



mongoose.connect(
  process.env.MONGO_URL!
).then(()=> {
    console.log(`App listening on port ${PORT}`)
    app.listen(PORT)
})
