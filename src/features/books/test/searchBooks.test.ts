
import { BookRepositoryMemory } from "../infrastructure/bookRepositoryMemory";
import type { Book } from "../domain/book";
import { expect, it, beforeEach, describe } from "vitest";



describe('BookRepositoryMemory.search', () => {
    let repo: BookRepositoryMemory;

    const books: Book[] = [
        { id: "456e4567-aa9b-1fd3-a4a6-425514174213", title: "Test Book 1: The Prologue" },
        { id: "123e4d37-ea9b-1fd3-a4aa-115533174213", title: "Test Book 2" },
        { id: "879e4567-e39b-1fd3-a463-335514174213", title: "Test Book 3: Electric Boogaloo" },
        { id: "234e4567-e49b-1fd3-a4e4-445523174213", title: "Test Book 4: The Last One" },
        { id: "444e4567-ed9b-1fd3-a4e4-443322174213", title: "Test Book 5: New World" },
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
        const result = await repo.search({ title: 'the' })
        const titles = result.map(u => u.title);
        expect(titles).toEqual(expect.arrayContaining(['Test Book 1: The Prologue', 'Test Book 4: The Last One']));
    })

    it('sorts by title ascending/descending', async () => {
        const asc = await repo.search({ sort: 'title', order: 'asc' });
        const desc = await repo.search({ sort: 'title', order: 'desc' });
        const titlesAsc = asc.map(i => i.title)
        const titlesDesc = desc.map(i => i.title)
        expect(titlesAsc).toEqual(['Test Book 1: The Prologue', "Test Book 2", "Test Book 3: Electric Boogaloo", "Test Book 4: The Last One", "Test Book 5: New World"])
        expect(titlesDesc).toEqual(["Test Book 5: New World", "Test Book 4: The Last One", "Test Book 3: Electric Boogaloo", "Test Book 2", "Test Book 1: The Prologue"])
    })

    it('applies limit correctly', async () => {
        const result = await repo.search({ limit: 2 });
        expect(result).toHaveLength(2);
    })

    it('applies offset correctly', async () => {
        const result = await repo.search({ sort: 'title', order: 'asc', offset: 3 });
        const names = result.map(u => u.title);
        expect(names).toEqual(["Test Book 4: The Last One", "Test Book 5: New World"]);
    });

    it('combines filter + sort + pagination', async () => {
        const result = await repo.search({
            title: 'te',
            sort: 'title',
            order: 'asc',
            limit: 2,
            offset: 1
        })

        const titles = result.map(i => i.title)
        expect(titles).toEqual(["Test Book 2", "Test Book 3: Electric Boogaloo"])
    })
})