import { getAllProjects } from '../models/project.js';

const showAllProjects = async (req, res) => {
    const title = 'Service Projects';
    let projects = [];
    let errorMessage = null;
    let organizations = [];

    try {
        projects = await getAllProjects();
        const grouped = projects.reduce((acc, project) => {
            const orgName = project.organization_name || 'Unknown Organization';
            if (!acc[orgName]) {
                acc[orgName] = [];
            }
            acc[orgName].push(project);
            return acc;
        }, {});

        organizations = Object.entries(grouped).map(([organization_name, projects]) => ({
            organization_name,
            projects,
        }));
    } catch (error) {
        console.error('Failed to load projects:', error);
        errorMessage = 'Unable to load projects at this time.';
    }

    res.render('projects', { title, organizations, errorMessage });
};

export { showAllProjects };