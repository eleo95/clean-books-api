import type { Book } from "../domain/book";
import type { BookRepository, BookSearchParams } from "../repository/bookRepository";



export class BookRepositoryMemory implements BookRepository{
    
    private books = new Map<string, Book>();
    
    async create(book: Book): Promise<void> {
        this.books.set(book.id, {...book, deleted:false});
    }
    async findById(id: string): Promise<Book | null> {
        const book = this.books.get(id)
        return book && !book.deleted ? book:null;
    }
    
    async search(params: BookSearchParams): Promise<Book[]> {
        let result = [...this.books.values()].filter(b=>!b.deleted);
        
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
    
    async softDelete(id: string): Promise<boolean> {
        const book = this.books.get(id)
        if(!book || book.deleted) return false;
        
        this.books.set(id, {...book, deleted:true})
        return true
    }
}