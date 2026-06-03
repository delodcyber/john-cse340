import { getAllOrganizations, getOrganizationDetails } from '../models/organization.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/organizations.js';

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

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render ('organization', {title, organizationDetails, projects});
};

export { showOrganizationDetailsPage};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

export { showNewOrganizationForm };

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = '/placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    // Set a success flash message
    req.flash('success', 'Organization added successfully!');
    
    res.redirect(`/organization/${organizationId}`);
};

export { processNewOrganizationForm };