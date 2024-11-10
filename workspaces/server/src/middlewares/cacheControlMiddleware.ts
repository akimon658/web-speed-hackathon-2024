import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();
  const url = new URL(c.req.url)
  const path = url.pathname
  if (path.startsWith('/image')) {
    c.res.headers.append('Cache-Control', 'public');
    c.res.headers.append('Cache-Control', 'max-age=31536000');
    return
  }
});
