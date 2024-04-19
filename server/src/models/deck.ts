import mongoose from "mongoose";

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const DeckSchema = new Schema({
    title: String,
    cards: [String],
})


export const DeckModal = mongoose.model("Deck", DeckSchema)