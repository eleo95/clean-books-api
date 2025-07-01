import { Book } from "../domain/book";
import { BookRepository } from "../repository/bookRepository";



export class BookRepositoryMemory implements BookRepository{

    private books = new Map<string, Book>();

    async create(book: Book): Promise<void> {
        this.books.set(book.id, book);
    }
    async findById(id: string): Promise<Book | null> {
       return this.books.get(id) ?? null;
    }

}