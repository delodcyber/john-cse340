import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/category.js';
import { body, validationResult } from 'express-validator';
import { createCategory } from '../models/new-category.js';

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
    // Validate and sanitize form input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new category form
        return res.redirect('/categories');
    }
    // For now, just log the form data and redirect back to the categories page
    const { name } = req.body;
    const categoryId = await createCategory(name);
    // Set a success flash message
    req.flash('success', 'Category added successfully!');
    res.redirect(`/categories/${categoryId}`); // Redirect to the new category's details page
};

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Name must be between 3 and 200 characters')
        .matches(/^[A-Za-z0-9 ]+$/)
        .withMessage('Name can only contain letters, numbers, and spaces')
];

export { processNewCategoryForm, categoryValidation };

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { showAssignCategoriesForm, processAssignCategoriesForm };