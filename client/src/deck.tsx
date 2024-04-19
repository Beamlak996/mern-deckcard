import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createCard } from "./api/cards"
import { getDeck } from "./api/decks"

export const Deck = () => {
  const [text, setText] = useState("")
  const [deck, setDeck] = useState<any>([])
  const [cards, setCards] = useState<any>([])

  const { deckId } = useParams()


  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault()
    const newCard: any = await createCard(deckId!, text)


    setText("")
    setCards([...cards, newCard])
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);


  return (
    <main className="h-full flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {cards.map((card: string, index: number) => (
          <div className="p-2 border rounded-md">
            <div key={index} className="flex items-center justify-between">
                <h2>{card}</h2>
              <p
                className="py-1 px-2 flex items-center justify-center  hover:bg-slate-100 rounded-sm transition cursor-pointer text-muted-foreground"
              >
                x
              </p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreateCard} className="flex gap-4 items-center">
        <label htmlFor="card-text">Card Title</label>
        <input
          type="text"
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          className="border border-black focus:border-sky-400"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-sky-500 text-white hover:bg-sky-400 transition"
        >
          Create card
        </button>
      </form>
    </main>
  );
}

