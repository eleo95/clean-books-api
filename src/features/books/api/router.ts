import express from "express";
import { createBookSchema } from "./validation";
import { BookRepositoryMemory } from "../infrastructure/bookRepositoryMemory";
import { CreateBook } from "../usecase/createBook";
import { SearchBooks } from "../usecase/searchBooks";
import type { Book } from "../domain/book";

const repo = new BookRepositoryMemory();
const createBook = new CreateBook(repo);
const searchBooks = new SearchBooks(repo);

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const parsed = createBookSchema.safeParse(req.body);
		if (!parsed.success) {
			throw new Error(parsed.error.message);
		}

		const book = await createBook.execute(parsed.data);
		res.status(201).json(book);
	} catch (error) {
		console.error("Error adding book:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/", async (req, res) => {
	const { title, sort, order, limit, offset } = req.query;

	const books = await searchBooks.execute({
		title: typeof title === "string" ? title : undefined,
		sort:
			typeof sort === "string" && ["id", "title"].includes(sort)
				? (sort as keyof Book)
				: undefined,
		order: order === "desc" ? "desc" : "asc",
		limit: typeof limit === "string" ? parseInt(limit) : undefined,
		offset: typeof offset === "string" ? parseInt(offset) : undefined,
	});

	res.json(books);
});

router.delete("/", async (req, res) => {
	try {
		const { id } = req.query;

		if (!id) {
			throw new Error("Bad request params!");
		}

		const response = await repo.softDelete(id.toString());
		if (!response) {
			throw new Error("Book not found!");
		}

		res.status(200).json({ id });
	} catch (error) {
		console.error("Error adding book:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
