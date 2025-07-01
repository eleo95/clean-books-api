import type { BookRepository, BookSearchParams } from "../repository/bookRepository";



export class SearchBooks {
    constructor(private repo: BookRepository) {}

    async execute(params: BookSearchParams) {
        return this.repo.search(params)
    }
}