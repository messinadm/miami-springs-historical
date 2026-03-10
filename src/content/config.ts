import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    time: z.string().optional(),
    location: z.string(),
    price: z.string().optional(),
    recurring: z.enum(['second-tuesday']).optional(),
  }),
});

const board = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { events, board };
