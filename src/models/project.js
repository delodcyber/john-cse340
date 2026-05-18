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
}

export {getAllProjects} 