import express from "express";
import {
  getQuotes,
  getQuoteByAuthor,
  getQuoteByID,
  getRandomQuote,
  updateQuote,
  addQuote,
  deleteQuote,
  upvoteQuote,
  downvoteQuote,
} from "../controllers/quotesController.js";

const router = express.Router();

router.get("/", getQuotes);
router.get("/random", getRandomQuote);
router.get("/:id", getQuoteByID);
router.get("/author/:author", getQuoteByAuthor);
router.post("/", addQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);
router.put("/:id/upvote", upvoteQuote);
router.put("/:id/downvote", downvoteQuote);

export default router;
