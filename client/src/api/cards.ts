export const createCard = async (deckId: string, text: string) => {
  const response = await fetch(`http://localhost:5000/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

