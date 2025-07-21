document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#quoteForm");
  const getQuotesButton = document.querySelector("#get-quotes");
  const getRandomQuoteButton = document.querySelector("#get-random-quote");
  const updateForm = document.querySelector("#updateQuote");
  const filterById = document.querySelector("#filter-id");
  const filterByAuthor = document.querySelector("#filter-author");
  const deleteById = document.querySelector("#delete-id");
  const outputDiv = document.querySelector("#output");

  async function showQuotes() {
    try {
      const res = await fetch("http://localhost:8080/api/quotes");
      if (!res.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const quotes = await res.json();

      outputDiv.replaceChildren();

      quotes.forEach((quote) => {
        let newQuote = document.createElement("div");
        newQuote.textContent = `${quote.q} - ${quote.author}`;

        let votes = document.createElement("div");
        votes.textContent = `${quote.voteCount}`;

        let upvoteButton = document.createElement("button");
        upvoteButton.innerHTML = "Upvote";
        upvoteButton.addEventListener("click", async () => {
          await fetch(`http://localhost:8080/api/quotes/${quote.id}/upvote`, {
            method: "PUT",
          });

          await showQuotes();
        });

        let downvoteButton = document.createElement("button");
        downvoteButton.innerHTML = "Downvote";
        downvoteButton.addEventListener("click", async () => {
          await fetch(`http://localhost:8080/api/quotes/${quote.id}/downvote`, {
            method: "PUT",
          });

          await showQuotes();
        });
        votes.append(upvoteButton, downvoteButton);
        newQuote.appendChild(votes);

        outputDiv.appendChild(newQuote);
      });
    } catch (error) {
      console.log("Failed", error);
    }
  }

  async function showRandomQuote() {
    try {
      const res = await fetch("http://localhost:8080/api/quotes/random");

      if (!res.ok) {
        throw new Error("Failed to fetch random quote");
      }
      const quote = await res.json();
      const randomQuote = document.createElement("div");
      randomQuote.textContent = `${quote.q} - ${quote.author}`;

      outputDiv.replaceChildren();
      outputDiv.appendChild(randomQuote);
    } catch (error) {
      console.log("Failed");
    }
  }

  async function addQuote(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const author = formData.get("author");
    const q = formData.get("quote");

    try {
      const res = await fetch("http://localhost:8080/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, q }),
      });

      if (!res.ok) {
        throw new Error("Failed to add quote");
      }

      await showQuotes();
    } catch (error) {
      console.log("Failed", error);
    }
  }

  async function getQuoteByID() {
    const idInput = parseInt(document.querySelector("#id-input").value);

    try {
      const res = await fetch(`http://localhost:8080/api/quotes/${idInput}`);

      if (!res.ok) {
        throw new Error("Failed to filter by ID");
      }

      const filteredQuote = await res.json();

      const quote = document.createElement("div");
      quote.textContent = `${filteredQuote.q} - ${filteredQuote.author}`;
      outputDiv.replaceChildren();
      outputDiv.appendChild(quote);
    } catch (error) {
      console.log("Failed", error);
    }
  }

  async function getQuoteByAuthor() {
    const authorInput = document.querySelector("#author-input").value;

    try {
      const res = await fetch(
        `http://localhost:8080/api/quotes/author/${authorInput}`
      );

      if (!res.ok) {
        throw new Error("Failed to filter by author name");
      }

      const quotes = await res.json();

      outputDiv.replaceChildren();
      quotes.forEach((quote) => {
        let quoteDiv = document.createElement("div");
        quoteDiv.textContent = `${quote.q} - ${quote.author}`;
        outputDiv.appendChild(quoteDiv);
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function deleteQuote() {
    const idInput = parseInt(document.querySelector("#id-input").value);

    const res = await fetch(`http://localhost:8080/api/quotes/${idInput}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete quote");
    }
    outputDiv.replaceChildren();

    await showQuotes();
  }

  async function updateQuote(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const author = formData.get("newAuthor");
    const q = formData.get("newQuote");
    const idInput = formData.get("newID");

    try {
      const res = await fetch(`http://localhost:8080/api/quotes/${idInput}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, q }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quote");
      }

      outputDiv.replaceChildren();
      await showQuotes();
    } catch (error) {
      console.log("Failed", error);
    }
  }

  deleteById.addEventListener("click", deleteQuote);
  getQuotesButton.addEventListener("click", showQuotes);
  getRandomQuoteButton.addEventListener("click", showRandomQuote);
  filterById.addEventListener("click", getQuoteByID);
  filterByAuthor.addEventListener("click", getQuoteByAuthor);
  form.addEventListener("submit", addQuote);
  updateForm.addEventListener("submit", updateQuote);
});
