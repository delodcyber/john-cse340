import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project_id, organization_id, title, description, project_location, project_date
      FROM public.project;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects} 