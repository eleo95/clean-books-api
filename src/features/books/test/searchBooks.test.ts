
import { BookRepositoryMemory } from "../infrastructure/bookRepositoryMemory";
import { Book } from "../domain/book";
import { expect, it, beforeEach, describe } from "vitest";



describe('BookRepositoryMemory.search', () => {
    let repo: BookRepositoryMemory;

    const books: Book[] = [
        { id: "456e4567-aa9b-1fd3-a4a6-425514174213", title: "The little Prince" },
        { id: "123e4d37-ea9b-1fd3-a4aa-115533174213", title: "The Wizard of Oz" },
        { id: "879e4567-e39b-1fd3-a463-335514174213", title: "Harry Potter" },
        { id: "234e4567-e49b-1fd3-a4e4-445523174213", title: "Moby Dick" },
        { id: "444e4567-ed9b-1fd3-a4e4-443322174213", title: "Moebius Tape" },
    ]

    beforeEach(async () => {
        repo = new BookRepositoryMemory();
        for (const book of books) {
            await repo.create(book)
        }
    });


    it('returns all books if no filters are applied', async () => {
        const result = await repo.search({});
        expect(result).toHaveLength(5);
    })

    it('filters by partial title (case-insensitive)', async () => {
        const result = await repo.search({title: 'The'})
        const titles = result.map(u => u.title);
        expect(titles).toEqual(expect.arrayContaining(['The little Prince', 'The Wizard of Oz']));
    })
})