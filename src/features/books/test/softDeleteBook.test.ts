import type { Book } from "../domain/book";
import { BookRepositoryMemory } from "../infrastructure/bookRepositoryMemory";
import { describe, expect, it } from "vitest";

describe("SoftDeleteBook", () => {
	const repo = new BookRepositoryMemory();

	const books: Book[] = [
		{
			id: "456e4567-aa9b-1fd3-a4a6-425514174213",
			title: "Test Book 1: The Prologue",
			deleted: false,
		},
		{
			id: "879e4567-e39b-1fd3-a463-335514174213",
			title: "Test Book 3: Electric Boogaloo",
			deleted: false,
		},
	];

	books.forEach(async (book) => {
		await repo.create(book);
	});

	it("can softdelete a book",async ()=>{
        const softDeletedResponse = await repo.softDelete(books[0].id)
		const booksAfter = await repo.search({})
        expect(softDeletedResponse).toEqual(true)
		expect(booksAfter).toHaveLength(1)
    });
});
