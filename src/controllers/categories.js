import { getAllCategories } from '../models/category.js';

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

export { showAllCategories };