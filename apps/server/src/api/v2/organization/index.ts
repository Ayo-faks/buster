import { Hono } from 'hono';
import { requireAuth } from '../../../middleware/auth';
import GET from './GET';
import PUT from './PUT';

const app = new Hono()
  // Apply authentication globally to ALL routes in this router
  .use('*', requireAuth)
  // Mount the modular routes
  .route('/', GET)
  .route('/', PUT);

export default app;
