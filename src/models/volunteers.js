import db from './db.js'

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING volunteer_id;
    `;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1 AND project_id = $2
        RETURNING volunteer_id;
    `;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

const isUserVolunteerForProject = async (userId, projectId) => {
    const query = `
        SELECT 1 FROM volunteer
        WHERE user_id = $1 AND project_id = $2
        LIMIT 1;
    `;
    const params = [userId, projectId];
    const result = await db.query(query, params);
    return result.rows.length > 0;
};

const getVolunteerProjectsForUser = async (userId) => {
    const query = `
        SELECT p.project_id,
               p.organization_id,
               o.organization_name,
               p.title,
               p.description,
               p.project_location,
               p.project_date,
               v.signed_up_at,
               v.status
          FROM volunteer v
          JOIN project p ON v.project_id = p.project_id
     LEFT JOIN organization o ON p.organization_id = o.organization_id
         WHERE v.user_id = $1
     ORDER BY p.project_date;
    `;
    const params = [userId];
    const result = await db.query(query, params);
    return result.rows;
};

export { addVolunteer, removeVolunteer, isUserVolunteerForProject, getVolunteerProjectsForUser };
