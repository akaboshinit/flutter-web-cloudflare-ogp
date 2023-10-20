type OgpProperty = {
	siteName: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
};

export const htmlRewriter = (args: OgpProperty) =>
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
