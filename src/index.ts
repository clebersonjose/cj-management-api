import express from 'express';
import routes from './routes';
import logger from './logger';

// // TODO: Create data base schema;
// TODO: Create data base models;
// TODO: Create data base connection;
// TODO: Create a route for insertion a blog post;
// TODO: Create a route for getting all blog posts;
// TODO: Create a route for getting a blog post by slug;
// TODO: Create a route for editing a blog post;
// TODO: Create a route for deleting a blog post;
// TODO: Create a route for authentication;
// TODO: Create a route for refresh authentication token;
// TODO: Create authentication middleware;
// TODO: Create authoization middleware;
// TODO: Error handling;
// TODO: Create tests for the routes;
// TODO: Document the routes;
// TODO: Document database;
// // TODO: Log system;

const app = express();
const PORT = 8000;

app.use(routes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  logger.info(`Server is running at http://localhost:${PORT}`);
});
