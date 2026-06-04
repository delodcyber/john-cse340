import express from 'express';
import {showAllOrganizations} from './controllers/organizations.js';
import { showAllCategories, showCategoryDetails } from './controllers/categories.js';
import { showAllProjects, showProjectDetailsPage } from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { show404Page, show500Page } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { showNewCategoryForm } from './controllers/categories.js';
import { processNewCategoryForm } from './controllers/categories.js';

const router = express.Router();
//  Routes to use templates instead of static files
router.get('/organizations', showAllOrganizations);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/categories', showAllCategories);
router.get('/category/:id', showCategoryDetails);
router.get('/projects', showAllProjects);
router.get('/project/:id', showProjectDetailsPage);
router.get('/404', show404Page);
router.get('/500', show500Page);
router.get('/', showHomePage); 
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);
// Route for new category page
router.get('/new-category', showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', processNewCategoryForm);

export default router;