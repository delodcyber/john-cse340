import { getAllOrganizations, getOrganizationDetails } from '../models/organization.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';


// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

export { organizationValidation };


// Controller function to show all organizations
const showAllOrganizations = async (req, res) => {
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
};

export { showAllOrganizations };

// Controller function to show organization details page
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render ('organization', {title, organizationDetails, projects});
};

export { showOrganizationDetailsPage};

// Controller function to show new organization form
const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

export { showNewOrganizationForm };

// Controller function to process new organization form submission
const processNewOrganizationForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }           // Validation passed - extract form data
    
    const { name, description, contactEmail } = req.body;
    const logoFilename = '/placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    // Set a success flash message
    req.flash('success', 'Organization added successfully!');
    
    res.redirect(`/organization/${organizationId}`);
};

export { processNewOrganizationForm };