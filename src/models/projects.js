import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT p.project_id,
               p.organization_id,
               o.organization_name,
               p.title,
               p.description,
               p.project_location,
               p.project_date
          FROM public.project p
          LEFT JOIN public.organization o
            ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};


const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT project_id,
        organization_id,
        title,
        description,
        project_location,
        project_date
        FROM public.project
        WHERE organization_id = $1
        ORDER by project_date;
    `;
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// NEW FUNCTION: Get upcoming projects (limited to a specified number)
// This joins with the organization table to get the organization name
// It filters for projects with dates >= today, orders by date ascending, and limits results
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id,
               p.organization_id,
               o.organization_name,
               p.title,
               p.description,
               p.project_location,
               p.project_date
          FROM public.project p
          LEFT JOIN public.organization o
            ON p.organization_id = o.organization_id
         WHERE p.project_date >= CURRENT_DATE
         ORDER BY p.project_date ASC
         LIMIT $1;
    `;
    
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// NEW FUNCTION: Get details for a single project by ID
// This joins with the organization table to get the organization name
const getProjectDetails = async (projectId) => {
    const query = `
        SELECT p.project_id,
               p.organization_id,
               o.organization_name,
               p.title,
               p.description,
               p.project_location,
               p.project_date
          FROM public.project p
          LEFT JOIN public.organization o
            ON p.organization_id = o.organization_id
         WHERE p.project_id = $1;
    `;
    
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    // Return the first (and should be only) row, or null if not found
    return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };