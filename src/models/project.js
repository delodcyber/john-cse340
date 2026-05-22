import db from './db.js'

const getAllProjects = async() => {
    /*const query = `
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
    `;*/

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
     LIMIT 5;`

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects} 

const getUpcomingProjects = async(number_of_projects) => {
    const query = `SElECT 
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        o.organization_id
        o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;`

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
}