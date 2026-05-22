// Test route for 500 errors
const show500Page = (req, res) => {
    res.status(500).render('500', { title: 'Server Error' });
};

// Test route for 404 errors
const show404Page = (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
};

// Export any controller functions
export { show404Page, show500Page };