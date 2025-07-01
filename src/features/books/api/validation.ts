import { z } from 'zod';

export const createBookSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1)
});

export type CreateBookDTO = z.infer<typeof createBookSchema>;
