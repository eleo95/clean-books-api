import type { BookRepository } from "../repository/bookRepository";

export class SoftDeleteBook {
	constructor(private repo: BookRepository) {}

	async execute(id: string) {
		return this.repo.softDelete(id);
	}
}
