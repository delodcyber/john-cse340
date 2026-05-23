import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/category.js';

const showAllCategories = async (req, res) => {
    const title = 'Service Project Categories';
    let categories = [];
    let errorMessage = null;

    try {
        categories = await getAllCategories();
    } catch (error) {
        console.error('Failed to load categories:', error);
        errorMessage = 'Unable to load categories at this time.';
    }

    res.render('categories', { title, categories, errorMessage });
};

// Show details for a single category and list projects in that category
const showCategoryDetails = async (req, res) => {
    const categoryId = req.params.id;
    console.log('DEBUG: showCategoryDetails called with id =', categoryId);
    const title = 'Category Details';
    let category = null;
    let projects = [];
    let errorMessage = null;

    try {
        category = await getCategoryById(categoryId);
        if (!category) {
            errorMessage = 'Category not found.';
        } else {
            projects = await getProjectsByCategoryId(categoryId);
        }
    } catch (error) {
        console.error('Failed to load category details:', error);
        errorMessage = 'Unable to load category details at this time.';
    }

    res.render('category', { title, category, projects, errorMessage });
};

export { showAllCategories, showCategoryDetails };