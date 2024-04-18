import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
config()

import { DeckModal } from "./models/deck"

const app = express()
const PORT = 5000

app.use(express.json())


app.post("/decks",async (req: Request, res: Response) => {
    const newDeck = new DeckModal({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
});

app.get("/", (req: Request, res: Response)=> {
    res.send("hello")
})

mongoose.connect(
  process.env.MONGO_URL!
).then(()=> {
    console.log(`App listening on port ${PORT}`)
    app.listen(PORT)
})
