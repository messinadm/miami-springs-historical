import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { resolveEventDate } from '../utils/events';

export async function GET(context: APIContext) {
  const events = await getCollection('events');

  const resolved = events.map(resolveEventDate);

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
