# Community Volunteer Portal

A Node.js and Express-based web application for managing nonprofit organizations, projects, categories, volunteers, and user access.

## Overview

This project provides a volunteer coordination portal with:
- organization and project listings
- category management and project assignment
- volunteer signup and removal for projects
- user authentication and role-based access control
- server-side rendering with EJS templates
- PostgreSQL database integration

## Features

- Browse organizations, projects, and categories
- View details for organizations, projects, and categories
- Register and log in as a user
- Volunteer for or withdraw from projects
- Admin-only pages to create and edit organizations, categories, and projects
- Assign categories to projects
- Dashboard for authenticated users
- Flash messaging and error handling for better user feedback

## Tech Stack

- Node.js
- Express 5
- EJS
- PostgreSQL
- bcrypt for password hashing
- express-session for session management
- express-validator for form validation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/delodcyber/john-cse340.git
   cd john-cse340
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables:

   - `DB_URL` or `DATABASE_URL` — PostgreSQL connection string
   - `SESSION_SECRET` — secret key for session encryption
   - `PORT` (optional) — application port, defaults to `3000`
   - `NODE_ENV` (optional) — `development` or `production`
   - `ENABLE_SQL_LOGGING` (optional) — set to `true` to log SQL queries in development

   Example connection string format:

   ```text
   postgresql://username:password@host:port/database
   ```

4. Initialize the PostgreSQL database:

   - Create the database in PostgreSQL
   - Run the SQL script located at `src/setup.sql`

   Example using `psql`:

   ```bash
   psql -d your_database -f src/setup.sql
   ```

## Running the Application

- Start the application in development mode with automatic reloads:

  ```bash
  npm run dev
  ```

- Start the production server:

  ```bash
  npm start
  ```

The app will be available at `http://127.0.0.1:3000` unless a different `PORT` is configured.

## Project Structure

- `server.js` — application entry point and Express setup
- `src/routes.js` — route definitions and access control
- `src/controllers/` — request handlers for users, organizations, projects, categories, volunteers, and errors
- `src/models/` — database access logic and model functions
- `src/views/` — EJS templates for rendering pages
- `src/setup.sql` — database schema and seed data
- `public/` — static assets including stylesheets and images

## Usage

- Visit `/register` to create a new user account
- Visit `/login` to sign in
- Visit `/dashboard` after signing in to view assigned volunteer projects
- Admin users can manage organizations, categories, projects, and category assignments

## Notes

- The application expects environment variables to be set externally. There is no built-in `.env` loader.
- Passwords are hashed using `bcrypt` before storing in the database.

## License

This repository is licensed under the ISC License.
