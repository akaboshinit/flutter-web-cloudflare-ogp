import { Hono } from 'hono';
import { Env } from './env';
import { htmlRewriter } from './html_rewriter';

const app = new Hono<{ Bindings: Env }>();

app.get('*', async (c) => {
	const noneOgpRes = await c.env.NoneOgpWorker.fetch(c.req.raw);
	// const noneOgpRes = await fetch('https://cdn2.thecatapi.com/images/5ia.jpg');

	return htmlRewriter({
		siteName: 'flutter-web-cloudflare-ogp',
		title: 'Ogp Example | flutter-web-cloudflare-ogp',
		description: 'flutter-web-cloudflare-ogp description',
		image: 'https://cdn2.thecatapi.com/images/5ia.jpg',
		imageAlt: 'cat image',
	}).transform(noneOgpRes);
});

export default app;
