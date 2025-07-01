import { Book } from "../domain/book";


export interface BookRepository {
    create(book: Book): Promise<void>;
    findById(id: string): Promise<Book | null>;
}