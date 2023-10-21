import { Hono } from 'hono';
import { Env } from './env';
import { htmlRewriter } from './html_rewriter';
import { generateImage } from './ogp_generate/generate_image';

const app = new Hono<{ Bindings: Env }>();

app.get('ogp', async (c) => {
	const title = c.req.query('title');

	const image = await generateImage(title ?? `インターネットやめろ`);
	return image as Response;
});

app.get('*', async (c) => {
	const noneOgpRes = await c.env.NoneOgpWorker.fetch(c.req.raw);

	const url = new URL(c.req.url);

	return htmlRewriter({
		siteName: 'flutter-web-cloudflare-ogp',
		// fluter側で設定したtitleが反映されるけど、クローニング等のためにここでも設定しておく
		title: 'Ogp Example | flutter-web-cloudflare-ogp',
		description: 'flutter-web-cloudflare-ogp description',
		image: url.origin + '/ogp',
		imageAlt: 'original image',
	}).transform(noneOgpRes);
});

export default app;
