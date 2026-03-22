import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Event title is required'),
    date: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    time: z.string().optional(),
    location: z.string().min(1, 'Event location is required'),
    price: z.string().optional(),
    recurring: z.enum(['monthly-second-tuesday']).optional(),
    recurringStartAfter: z.coerce.date().optional(),
  }).refine(
    data => data.recurring || data.date,
    { message: 'Either "date" or "recurring" must be set on every event' }
  ),
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
