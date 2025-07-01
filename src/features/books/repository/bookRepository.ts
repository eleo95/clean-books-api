import type { Book } from "../domain/book";

export interface BookSearchParams {
	title?: string;
	sort?: keyof Book;
	order?: "asc" | "desc";
	limit?: number;
	offset?: number;
}

export interface BookRepository {
	create(book: Book): Promise<void>;
	findById(id: string): Promise<Book | null>;
	search(params: BookSearchParams): Promise<Book[]>;
	softDelete(id: string): Promise<boolean>;
}
