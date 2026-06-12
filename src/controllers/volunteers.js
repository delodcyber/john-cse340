import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

// Add volunteer to a project (requires user to be logged in)
const addVolunteerHandler = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        const added = await addVolunteer(userId, projectId);
        if (added) {
            req.flash('success', 'You have signed up to volunteer for this project.');
        } else {
            req.flash('info', 'You are already signed up to volunteer for this project.');
        }
    } catch (error) {
        console.error('Failed to add volunteer:', error);
        req.flash('error', 'Unable to sign up to volunteer at this time.');
    }

    res.redirect(`/project/${projectId}`);
};

// Remove volunteer signup for a project
const removeVolunteerHandler = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        const removed = await removeVolunteer(userId, projectId);
        if (removed) {
            req.flash('success', 'You have been removed as a volunteer for this project.');
        } else {
            req.flash('info', 'You were not signed up as a volunteer for this project.');
        }
    } catch (error) {
        console.error('Failed to remove volunteer:', error);
        req.flash('error', 'Unable to remove volunteer signup at this time.');
    }

    res.redirect(`/project/${projectId}`);
};

export { addVolunteerHandler, removeVolunteerHandler };
