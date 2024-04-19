import { Request, Response } from "express";
import { DeckModal } from "../models/deck";

export const createCardController = async (req: Request, res: Response) => {
    const deckId = req.params.deckId
    const deck = await DeckModal.findById(deckId)

    if(!deck) return res.status(400).send("No deck of this id exists.")
 
    const { text } = req.body
    deck.cards.push(text)
    await deck.save()
    res.json(deck)
};

export const getCardController = async (req: Request, res: Response) => {
    const deckId = req.params.deckId
    const deck = await DeckModal.findById(deckId);

    if (!deck) return res.status(400).send("No deck of this id exists.");

    res.json(deck.cards)
};