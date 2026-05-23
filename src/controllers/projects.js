import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/category.js';

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

    try {
        project = await getProjectDetails(projectId);

        if (!project) {
            errorMessage = 'Project not found.';
        } else {
            // Fetch categories for this project and attach to project
            const categories = await getCategoriesByProjectId(projectId);
            project.categories = categories;
        }
    } catch (error) {
        console.error('Failed to load project details:', error);
        errorMessage = 'Unable to load project details at this time.';
    }

    res.render('project', { title, project, errorMessage });
};

export { showAllProjects, showProjectDetailsPage };