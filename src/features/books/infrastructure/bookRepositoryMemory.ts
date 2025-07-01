import type { Book } from "../domain/book";
import type { BookRepository, BookSearchParams } from "../repository/bookRepository";



export class BookRepositoryMemory implements BookRepository{
    
    private books = new Map<string, Book>();
    
    async create(book: Book): Promise<void> {
        this.books.set(book.id, book);
    }
    async findById(id: string): Promise<Book | null> {
        return this.books.get(id) ?? null;
    }
    
    async search(params: BookSearchParams): Promise<Book[]> {
        let result = [...this.books.values()];

        if(params.title){
            const searchTitle = params.title.toLowerCase();
            result = result.filter(b => 
                b.title.toLowerCase().includes(searchTitle)
            );
        }

        if(params.sort){
            const sortParams = params.sort
            result.sort((a,b) => {
                const valA = a[sortParams]
                const valB = b[sortParams]

                if(typeof valA === 'string' && typeof valB === 'string'){
                    return params.order === 'desc'
                    ? valB.localeCompare(valA)
                    : valA.localeCompare(valB)
                }

                return 0;
            })
        }

        return result.slice(params.offset ?? 0, (params.offset ?? 0) + (params.limit ?? result.length))
    }
}