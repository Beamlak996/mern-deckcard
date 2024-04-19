import { Request, Response } from "express";

import { DeckModal } from "../models/deck";


// get all decks controller
export const getDecksController = async (req: Request, res: Response) => {
  const decks = await DeckModal.find();
  res.json(decks);
};


// create a deck contorller
export const createDeckController = async (req: Request, res: Response) => {
  const newDeck = new DeckModal({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
};


// delete a deck controller
export const deleteDeckController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  await DeckModal.findByIdAndDelete(deckId);
  res.json({
    message: "Successfuly deleted the deck",
  });
};