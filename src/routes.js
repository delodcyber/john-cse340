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
import { 
    processNewCategoryForm,
    categoryValidation
 } from './controllers/categories.js';
import { showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';
import {
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';
import {
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

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
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route for new category page
router.get('/new-category', showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);
// Routes to edit a category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
// Route for editing an organization
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Routes for new project page and form submission
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

export { router };