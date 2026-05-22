import { getAllOrganizations } from '../models/organizations.js';

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