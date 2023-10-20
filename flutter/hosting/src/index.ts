import {Hono} from 'hono';
import {serveStatic} from 'hono/cloudflare-workers';

const app = new Hono();

app.get('*', serveStatic({ root: './' }));

export default app;
