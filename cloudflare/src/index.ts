export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const noneOgpRes = await fetch(`https://flutter-web-cloudflare-ogp.web.app${url.pathname}`);

		return htmlRewriter({
			siteName: 'flutter-web-cloudflare-ogp',
			title: 'Ogp Example | flutter-web-cloudflare-ogp',
			description: 'flutter-web-cloudflare-ogp description',
			image: 'https://cdn2.thecatapi.com/images/5ia.jpg',
			imageAlt: 'cat image',
		}).transform(noneOgpRes);
	},
};

type OgpProperty = {
	siteName: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
};

const htmlRewriter = (args: OgpProperty) =>
	new HTMLRewriter().on('head', {
		element: (e) => {
			e.before(
				`
            <title>${args.title}</title>
            <meta name="description" content="${args.description}" />
            <meta property="og:title" content="${args.title}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="${args.siteName}" />
            <meta property="og:description" content="${args.description}" />
            <meta property="og:url" content="https://example.com" />
            <meta property="og:image" content="${args.image}" />
            <meta property="og:image:alt" content="${args.imageAlt}" />
            <meta property="twitter:title" content="${args.title}" />
            <meta property="twitter:description" content="${args.description}" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image:src" content="${args.image}" />
            `,
				{ html: true }
			);
		},
	});
