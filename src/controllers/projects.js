import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// Set the number of upcoming projects to display on the main projects page
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showAllProjects = async (req, res) => {
    const title = 'Upcoming Service Projects';
    let projects = [];
    let errorMessage = null;

    try {
        // Call the new function to get upcoming projects (limited to NUMBER_OF_UPCOMING_PROJECTS)
        projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    } catch (error) {
        console.error('Failed to load projects:', error);
        errorMessage = 'Unable to load projects at this time.';
    }

    res.render('projects', { title, projects, errorMessage });
};

// NEW FUNCTION: Show details for a single project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const title = 'Project Details';
    let project = null;
    let errorMessage = null;

    try {
        // Use the new getProjectDetails function to get a single project by ID
        project = await getProjectDetails(projectId);
        
        // If project is not found, set an error message
        if (!project) {
            errorMessage = 'Project not found.';
        }
    } catch (error) {
        console.error('Failed to load project details:', error);
        errorMessage = 'Unable to load project details at this time.';
    }

    res.render('project', { title, project, errorMessage });
};

export { showAllProjects, showProjectDetailsPage };