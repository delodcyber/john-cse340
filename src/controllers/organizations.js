import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';    

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