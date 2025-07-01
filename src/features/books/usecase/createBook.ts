import type { BookRepository } from "../repository/bookRepository";


interface CreateBookInput {
    id: string;
    title: string;
}


export class CreateBook {
    constructor(private repo: BookRepository) { }

    async execute(input: CreateBookInput) {
        const book = { id: input.id, title: input.title }
        await this.repo.create(book)
        return book;
    }
}