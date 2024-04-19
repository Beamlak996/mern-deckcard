export const createDeck = async (title: string) => {
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    return response.json()
}



export const getDecks = async () => {
  const response = await fetch("http://localhost:5000/decks");
  return response.json();
}


export const getDeck = async (deckId: string) => {
  const response = await fetch(`http://localhost:5000/decks/${deckId}`);
  return response.json()
}


export const deleteDeck = async (deckId: string) => {
  await fetch(`http://localhost:5000/decks/${deckId}`, {
    method: "DELETE"
  });
}