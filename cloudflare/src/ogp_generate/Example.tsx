import React from 'react';

export interface ExampleProps {
	msg: string;
	from?: string;
	to?: string;
}

export const Example = ({ msg, from = 'rgba(25,152,97,1)', to = 'rgba(0,93,255,1)' }: ExampleProps) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: `linear-gradient(45deg, ${from} 0%, ${to} 100%)`,
			}}
		>
			<div
				style={{
					backgroundImage:
						'linear-gradient(90deg, rgb(255, 0, 0), rgb(255, 165, 0), rgb(255, 255, 0), rgb(0, 128, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(238, 130, 238))',
					backgroundClip: 'text',
					// '-webkit-background-clip': 'text',
					color: 'transparent',
					fontSize: 100,
				}}
			>
				{msg}
			</div>
		</div>
	);
};
