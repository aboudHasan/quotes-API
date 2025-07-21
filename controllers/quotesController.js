//prettier-ignore
let quotes = [
  { id: 1, author: "Oscar Wilde", q: "Be yourself. Everyone else is taken.", voteCount: 0},
  { id: 2, author: "Leonardo Da Vinci", q: "Simplicity is the ultimate sophistication.", voteCount: 0},
  { id: 3, author: "Steve Jobs", q: "Stay hungry, stay foolish.", voteCount: 0 },
  { id: 4, author: "Albert Einstein", q: "In the middle of difficulty lies opportunity.", voteCount: 0 },
  { id: 5, author: "Linus Torvalds", q: "Talk is cheap. Show me the code.", voteCount: 0 },
  { id: 6, author: "John Johnson", q: "First, solve the problem. Then, write the code.", voteCount: 0 },
  { id: 7, author: "Oscar Wilde", q: "Experience is the name everyone gives to their mistakes.", voteCount: 0},
  { id: 8, author: "Harold Abelson", q: "Programs must be written for people to read, and only incidentally for machines to execute.", voteCount: 0 },
  { id: 9, author: "Jim Highsmith", q: "The best way to get a project done faster is to start sooner.", voteCount: 0},
  { id: 10, author: "Cory House", q: "Code is like humor. When you have to explain it, it's bad.", voteCount: 0}
];

export const getQuotes = (req, res) => {
  res.status(200).json(quotes);
};

export const getQuoteByID = (req, res, next) => {
  const id = req.params.id;
  const quote = quotes.find((quote) => quote.id === parseInt(id));

  if (!quote) {
    const error = new Error("Could not find a quote with that ID");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(quote);
};

export const getQuoteByAuthor = (req, res, next) => {
  const author = req.params.author.toLowerCase();
  const quote = quotes.filter((quote) => quote.author.toLowerCase() === author);

  if (quote.length === 0) {
    const error = new Error("Could not find a quote from that author");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(quote);
};

export const getRandomQuote = (req, res) => {
  const randomID = Math.floor(Math.random() * quotes.length + 1);
  const quote = quotes.find((quote) => quote.id === randomID);

  res.status(200).json(quote);
};

export const addQuote = (req, res, next) => {
  const newQuote = {
    id: quotes.length + 1,
    author: req.body.author,
    q: req.body.q,
  };

  if (!req.body.author || !req.body.q) {
    const error = new Error(
      "Could not submit quote. Please fill out the appropriate fields"
    );
    error.status = 400;
    return next(error);
  }

  quotes.push(newQuote);
  res.status(200).json(newQuote);
};

export const updateQuote = (req, res, next) => {
  const id = req.params.id;
  const quote = quotes.find((quote) => quote.id === parseInt(id));

  if (!quote) {
    const error = new Error("Could not update quote with that ID");
    error.status = 404;
    return next(error);
  }

  quote.author = req.body.author;
  quote.q = req.body.q;

  res.status(200).json({ message: "Success" });
};

export const deleteQuote = (req, res, next) => {
  const id = req.params.id;
  const quote = quotes.find((quote) => quote.id === parseInt(id));

  if (!quote) {
    const error = new Error("Could not delete quote with that ID");
    error.status = 404;
    return next(error);
  }

  quotes = quotes.filter((quote) => quote.id != id);
  res.status(200).json({ message: "Success" });
};

export const upvoteQuote = (req, res, next) => {
  const id = req.params.id;
  const quote = quotes.find((quote) => quote.id === parseInt(id));

  if (!quote) {
    const error = new Error("Could not upvote quote");
    error.status = 500;
    return next(error);
  }

  quote.voteCount += 1;
  res.status(200).json({ message: "Success" });
};

export const downvoteQuote = (req, res, next) => {
  const id = req.params.id;
  const quote = quotes.find((quote) => quote.id === parseInt(id));

  if (!quote) {
    const error = new Error("Could not downvote quote");
    error.status = 500;
    return next(error);
  }

  quote.voteCount -= 1;
  res.status(200).json({ message: "Success" });
};
