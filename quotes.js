import express from "express";
import quotes from "./routes/routers.js";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/error.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/quotes", quotes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
