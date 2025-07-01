import express from "express";
import bookRouter from "./features/books/api/router";

const app = express();
app.use(express.json());

app.use("/books", bookRouter);

export default app;
