import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

function nextSecondTuesday(startAfter?: Date): Date {
  const after = startAfter && startAfter > new Date() ? startAfter : new Date();
  for (let offset = 0; offset <= 3; offset++) {
    const year = after.getFullYear() + Math.floor((after.getMonth() + offset) / 12);
    const month = (after.getMonth() + offset) % 12;
    const first = new Date(year, month, 1);
    const daysUntilTuesday = (2 - first.getDay() + 7) % 7;
    const secondTuesday = new Date(year, month, 1 + daysUntilTuesday + 7, 16, 0, 0);
    if (secondTuesday > after) return secondTuesday;
  }
  const next = new Date(after.getFullYear(), after.getMonth() + 1, 1);
  const daysUntilTuesday = (2 - next.getDay() + 7) % 7;
  return new Date(next.getFullYear(), next.getMonth(), 1 + daysUntilTuesday + 7, 16, 0, 0);
}

export async function GET(context: APIContext) {
  const events = await getCollection('events');

  const resolved = events.map(event => {
    if (event.data.recurring === 'monthly-second-tuesday') {
      return { ...event, data: { ...event.data, date: nextSecondTuesday(event.data.recurringStartAfter) } };
    }
    return event;
  });

  const sorted = resolved
    .filter(e => e.data.date! >= new Date())
    .sort((a, b) => a.data.date!.getTime() - b.data.date!.getTime());

  return rss({
    title: 'Miami Springs Historical Society — Upcoming Events',
    description: 'Upcoming events from the Miami Springs Historical Society.',
    site: context.site!,
    items: sorted.map(event => ({
      title: event.data.title,
      pubDate: event.data.date!,
      description: [
        event.data.time,
        event.data.location,
        event.data.price,
      ].filter(Boolean).join(' · '),
      link: '/#events',
    })),
  });
}
