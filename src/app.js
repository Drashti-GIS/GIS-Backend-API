/**
 * System and 3rd party libs
 */
import express from 'express';

/**
 * Required Middleware
 */
import CommonMiddleware from './middlewares/initialize.middleware.js';
/**
 * Bootstrap App
 */
const app = express();

// Basic route
app.get('/api', (req, res) => {
  return res.json({ message: 'Thank you for visiting YAMAHA MUSIC API 👋🏻 !' });
});

/**
 * Mount Middleware
 */

CommonMiddleware(app);

export default app;
