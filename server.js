import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/project.js';

// Define the the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

//create the __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/**
  * Routes to serve static files (before using templates)
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.ejs'));
});

app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.ejs'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.ejs'));
});
**/

/**
 * Routes to use templates instead of static files
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});

app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    let organizations = [];
    let errorMessage = null;

    try {
        organizations = await getAllOrganizations();
    } catch (error) {
        console.error('Failed to load organizations:', error);
        errorMessage = 'Unable to load organizations at this time.';
    }

    res.render('organizations', { title, organizations, errorMessage });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    let projects = [];
    let errorMessage = null;

    try {
        projects = await getAllProjects();
    } catch (error) {
        console.error('Failed to load projects:', error);
        errorMessage = 'Unable to load projects at this time.';
    }

    res.render('projects', { title, projects, errorMessage });
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});