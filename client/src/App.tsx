import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck, deleteDeck, getDecks } from "./api/decks";

function App() {
  const [decks, setDecks] = useState<any>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDeck: any = await createDeck(title)

    setDecks([...decks, newDeck]);
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId)
    setDecks(decks.filter((deck: any) => deck._id !== deckId));
  };

  useEffect(() => {
    const fetchDecks = async () => {
      const decks = await getDecks()
      setDecks(decks);
    };
    fetchDecks();
  }, []);

  return (
    <main className="h-full flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {decks.map((deck: any) => (
          <div key={deck._id} className="p-2 border rounded-md">
            <div className="flex items-center justify-between">
              <Link to={`/decks/${deck._id}`}>
                <h2>{deck.title}</h2>
              </Link>
              <p
                onClick={() => handleDeleteDeck(deck._id)}
                className="py-1 px-2 flex items-center justify-center  hover:bg-slate-100 rounded-sm transition cursor-pointer text-muted-foreground"
              >
                x
              </p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreateDeck} className="flex gap-4 items-center">
        <label htmlFor="deck-title">Deck Title</label>
        <input
          type="text"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          className="border border-black focus:border-sky-400"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-sky-500 text-white hover:bg-sky-400 transition"
        >
          Create deck
        </button>
      </form>
    </main>
  );
}

export default App;
