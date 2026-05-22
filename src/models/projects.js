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

export { getAllProjects,getProjectsByOrganizationId };