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


const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

export { showNewCategoryForm };

const processNewCategoryForm = async (req, res) => {
    // For now, just log the form data and redirect back to the categories page
    const { name } = req.body;
    const categoryId = await createCategory(name);
    // Set a success flash message
    req.flash('success', 'Category added successfully!');
    res.redirect(`/categories/${categoryId}`); // Redirect to the new category's details page
};

export { processNewCategoryForm };