import { ImageResponse } from '@vercel/og';
import React from 'react';
import { Example } from './Example';
import { loadGoogleFont } from './fonts';

export const generateImage = async (title: string): Promise<ImageResponse> => {
	const font = await loadGoogleFont({
		family: 'Public Sans',
		weight: 700,
	});

	return new ImageResponse(<Example msg={title} />, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'PublicSans',
				data: font,
				weight: 700,
				style: 'normal',
			},
		],
		emoji: 'twemoji',
	});
};
