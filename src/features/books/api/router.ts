import express from 'express';
import { createBookSchema } from './validation';
import { BookRepositoryMemory } from '../infrastructure/bookRepositoryMemory';
import { CreateBook } from '../usecase/createBook';

const repo = new BookRepositoryMemory();
const createBook = new CreateBook(repo);

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const parsed = createBookSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new Error(parsed.error.message)
        }

        const book = await createBook.execute(parsed.data);
        res.status(201).json(book);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Server error' });

    }
});

export default router;

