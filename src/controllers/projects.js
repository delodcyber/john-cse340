import { getUpcomingProjects, getProjectDetails, updateProject } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/category.js';
import { isUserVolunteerForProject } from '../models/volunteers.js';
import { createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organization.js';
import { body, validationResult } from 'express-validator';


// Set the number of upcoming projects to display on the main projects page
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showAllProjects = async (req, res) => {
    const title = 'Upcoming Service Projects';
    let projects = [];
    let errorMessage = null;

    try {
        // Call the function to get upcoming projects (limited to NUMBER_OF_UPCOMING_PROJECTS)
        projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    } catch (error) {
        console.error('Failed to load projects:', error);
        errorMessage = 'Unable to load projects at this time.';
    }

    res.render('projects', { title, projects, errorMessage });
};

// Show details for a single project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const title = 'Project Details';
    let project = null;
    let errorMessage = null;
    let isVolunteer = false;

    try {
        project = await getProjectDetails(projectId);

        if (!project) {
            errorMessage = 'Project not found.';
        } else {
            // Fetch categories for this project and attach to project
            const categories = await getCategoriesByProjectId(projectId);
            project.categories = categories;
            // If user is logged in, check volunteer status
            if (req.session && req.session.user) {
                try {
                    isVolunteer = await isUserVolunteerForProject(req.session.user.user_id, projectId);
                } catch (err) {
                    console.error('Failed to check volunteer status:', err);
                }
            }
        }
    } catch (error) {
        console.error('Failed to load project details:', error);
        errorMessage = 'Unable to load project details at this time.';
    }

    res.render('project', { title, project, errorMessage, isVolunteer });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Validate and sanitize form input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

// (exports moved to bottom to include edit handlers)

// Show the edit form populated with existing project data
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const title = 'Edit Project';

    try {
        const project = await getProjectDetails(projectId);
        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/projects');
        }

        const organizations = await getAllOrganizations();

        res.render('edit-project', { title, project, organizations });
    } catch (error) {
        console.error('Failed to load edit project form:', error);
        req.flash('error', 'Unable to load edit form at this time');
        res.redirect('/projects');
    }
};

// Process the submitted edit form
const processEditProjectForm = async (req, res) => {
    const errors = validationResult(req);
    const projectId = req.params.id;

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => req.flash('error', error.msg));
        return res.redirect(`/edit-project/${projectId}`);
    }

    const { title, description, location, date, organizationId } = req.body;

    try {
        await updateProject(projectId, title, description, location, date, organizationId);
        req.flash('success', 'Project updated successfully');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Failed to update project:', error);
        req.flash('error', 'There was an error updating the project');
        res.redirect(`/edit-project/${projectId}`);
    }
};

export { showAllProjects, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };