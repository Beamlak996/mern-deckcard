import express, { Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
config()

import { DeckModal } from "./models/deck"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.get("/decks", async (req: Request, res: Response) => {
    const decks = await DeckModal.find()
    res.json(decks)
});

app.post("/decks",async (req: Request, res: Response) => {
    const newDeck = new DeckModal({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
});


mongoose.connect(
  process.env.MONGO_URL!
).then(()=> {
    console.log(`App listening on port ${PORT}`)
    app.listen(PORT)
})
