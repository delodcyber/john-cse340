import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id,
               category_name,
               description
          FROM public.category
         ORDER BY category_name;
    `;

    const result = await db.query(query);
    return result.rows;
};

// Get a single category by its ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id,
               category_name,
               description
          FROM public.category
         WHERE category_id = $1;
    `;
    const params = [categoryId];
    const result = await db.query(query, params);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get all categories for a given project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id,
               c.category_name,
               c.description
          FROM public.category c
          JOIN public.project_category pc
            ON c.category_id = pc.category_id
         WHERE pc.project_id = $1
         ORDER BY c.category_name;
    `;
    const params = [projectId];
    const result = await db.query(query, params);
    return result.rows;
};

// Get all projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
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
          JOIN public.project_category pc
            ON p.project_id = pc.project_id
         WHERE pc.category_id = $1
         ORDER BY p.project_date;
    `;
    const params = [categoryId];
    const result = await db.query(query, params);
    return result.rows;
};


const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

// Update a category's name
const updateCategory = async (categoryId, name) => {
        const query = `
                UPDATE category
                     SET category_name = $1
                 WHERE category_id = $2
             RETURNING category_id;
        `;
        const params = [name, categoryId];
        const result = await db.query(query, params);
        return result.rows.length > 0 ? result.rows[0].category_id : null;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, assignCategoryToProject, updateCategoryAssignments, updateCategory };
