import React, { useEffect, useState } from "react"

function App() {
  const [decks, setDecks] = useState([])
  const [title, setTitle] = useState("")

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    setTitle("")
  }

  useEffect(()=> {
    const fetchDecks = async () => {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <main className="h-full flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {decks.map((deck: any) => (
          <div key={deck.id} className="p-2 border rounded-md">
            {deck.title}
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
