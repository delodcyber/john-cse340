import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';
import { authenticateUser, getAllUsers } from '../models/users.js';
import { getVolunteerProjectsForUser } from '../models/volunteers.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

export { showUserRegistrationForm, processUserRegistrationForm };

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};
export { showLoginForm, processLoginForm, processLogout };

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};


export { requireLogin };

const showDashboard = async (req, res) => {
    const user = req.session.user;
    let volunteerProjects = [];

    try {
        volunteerProjects = await getVolunteerProjectsForUser(user.user_id);
    } catch (error) {
        console.error('Failed to load volunteered projects for dashboard:', error);
        req.flash('error', 'Unable to load your volunteered projects at this time.');
    }

    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        volunteerProjects
    });
};
export { showDashboard };

const showAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('users', {
            title: 'Users',
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error', 'Unable to load users.');
        res.redirect('/dashboard');
    }
};
export { showAllUsers };

const  requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }
            // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/dashboard');
        }

        next();
    };
};
export { requireRole };