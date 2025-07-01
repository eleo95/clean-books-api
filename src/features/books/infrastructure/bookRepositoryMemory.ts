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
            result = result.filter(b => 
                b.title.toLowerCase().includes(params.title!.toLowerCase())
            );
        }

        if(params.sort){
            result.sort((a,b) => {
                const valA = a[params.sort!]
                const valB = b[params.sort!]

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