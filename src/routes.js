import express from 'express';
import { 
    showAllCategories, 
    showCategoryDetails, 
    showNewCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showEditCategoryForm, 
    processEditCategoryForm,
} from './controllers/categories.js';
import { 
    showAllProjects, 
    showProjectDetailsPage, 
    showEditProjectForm, 
    processEditProjectForm 
} from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { show404Page, show500Page } from './controllers/errors.js';
import {
    showAllOrganizations,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { 
    processNewCategoryForm,
    categoryValidation
 } from './controllers/categories.js';

import {
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';

import { 
    showUserRegistrationForm, 
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    requireLogin,
    requireRole
} from './controllers/users.js';


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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route for new category page
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
// Routes to edit a category
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
// Route for editing an organization
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
// Routes for new project page and form submission
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to edit a project
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'),   processAssignCategoriesForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Dashboard route (protected)
router.get('/dashboard', requireLogin, showDashboard);

export { router };