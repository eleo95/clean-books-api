import { describe, it, expect } from "vitest";
import { BookRepositoryMemory } from "../infrastructure/bookRepositoryMemory";
import { CreateBook } from "../usecase/createBook";




describe('CreateBook', () => {
    it('can create a book', async () => {
        const repo = new BookRepositoryMemory()
        const usecase = new CreateBook(repo)

        const book = await usecase.execute({
            id: '123e4567-e89b-12d3-a456-426614174000',
            title: 'Test Book 1: The Prologue'
        })

        expect(await repo.findById(book.id)).toEqual(book)
    })
})