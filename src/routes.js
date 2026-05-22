import express from 'express';
import {showAllOrganizations} from './controllers/organizations.js';
import { showAllCategories } from './controllers/categories.js';
import { showAllProjects, showProjectDetailsPage } from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { show404Page, show500Page } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';


const router = express.Router();
//  Routes to use templates instead of static files
router.get('/organizations', showAllOrganizations);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/categories', showAllCategories);
router.get('/projects', showAllProjects);
router.get('/project/:id', showProjectDetailsPage);
router.get('/404', show404Page);
router.get('/500', show500Page);
router.get('/', showHomePage); 

export default router;