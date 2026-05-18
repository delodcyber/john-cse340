-- Create an Organization Table With Necessary Columns
CREATE TABLE organization (
            organization_id SERIAL PRIMARY KEY,
			organization_name VARCHAR (150) NOT NULL,
            description TEXT NOT NULL,
            contact_email VARCHAR(225) UNIQUE NOT NULL,
            logo_filename VARCHAR(225) NOT NULL
);


-- Insert 3 organization into the Organization table
INSERT INTO organization(organization_id, organization_name, description, contact_email, logo_filename)
VALUES 
	(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	(2, 'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- Create a Project Table with Necessary Columns
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Insert projects into the Project table
INSERT INTO project (
    organization_id,
    title,
    description,
    project_location,
    project_date
)
VALUES

-- =========================================
-- BrightFuture Builders (organization_id = 1)
-- =========================================
(
    1,
    'Community Center Renovation',
    'Renovating an aging community center using sustainable construction materials.',
    'Calgary, Alberta',
    '2026-06-15'
),
(
    1,
    'Affordable Housing Initiative',
    'Building affordable housing units for low-income families.',
    'Edmonton, Alberta',
    '2026-07-20'
),
(
    1,
    'Playground Restoration',
    'Restoring public playgrounds with safer and eco-friendly equipment.',
    'Red Deer, Alberta',
    '2026-08-10'
),
(
    1,
    'Bridge Safety Upgrade',
    'Upgrading pedestrian bridges to improve accessibility and safety.',
    'Lethbridge, Alberta',
    '2026-09-05'
),
(
    1,
    'Solar School Retrofit',
    'Installing solar panels and energy-efficient systems in schools.',
    'Medicine Hat, Alberta',
    '2026-10-01'
),

-- =========================================
-- GreenHarvest Growers (organization_id = 2)
-- =========================================
(
    2,
    'Downtown Rooftop Garden',
    'Creating rooftop gardens to promote urban agriculture.',
    'Calgary, Alberta',
    '2026-05-25'
),
(
    2,
    'Community Greenhouse Program',
    'Building greenhouses for year-round food production.',
    'Edmonton, Alberta',
    '2026-06-18'
),
(
    2,
    'School Garden Expansion',
    'Expanding educational gardens in elementary schools.',
    'Airdrie, Alberta',
    '2026-07-12'
),
(
    2,
    'Neighborhood Compost Initiative',
    'Launching a compost collection and education program.',
    'Okotoks, Alberta',
    '2026-08-08'
),
(
    2,
    'Urban Orchard Project',
    'Planting fruit trees in public spaces for community access.',
    'Banff, Alberta',
    '2026-09-14'
),

-- =========================================
-- UnityServe Volunteers (organization_id = 3)
-- =========================================
(
    3,
    'Winter Clothing Drive',
    'Organizing volunteers to distribute winter clothing to shelters.',
    'Calgary, Alberta',
    '2026-11-01'
),
(
    3,
    'Senior Support Visits',
    'Coordinating volunteers to assist isolated seniors.',
    'Edmonton, Alberta',
    '2026-06-30'
),
(
    3,
    'Food Bank Volunteer Campaign',
    'Recruiting volunteers for local food bank operations.',
    'Red Deer, Alberta',
    '2026-07-22'
),
(
    3,
    'Community Cleanup Day',
    'Hosting neighborhood cleanup and beautification events.',
    'Canmore, Alberta',
    '2026-08-16'
),
(
    3,
    'Back-to-School Supply Drive',
    'Collecting and distributing school supplies for children in need.',
    'Lethbridge, Alberta',
    '2026-09-03'
);

-- ==============================
-- Category Table
-- ==============================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);


-- ==============================
-- Project Category Table
-- ==============================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_pc_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pc_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);


-- Insert Into Category Table
INSERT INTO category (category_name, description)
VALUES
('Environmental', 'Projects focused on sustainability, green energy, and ecological improvement'),
('Educational', 'Projects that support learning, schools, and educational development'),
('Community Service', 'Projects aimed at improving community welfare and public infrastructure'),
('Health and Wellness', 'Projects supporting physical and mental well-being of individuals and communities');


-- Insert Into Project Category table
INSERT INTO project_category (project_id, category_id)
VALUES
(5, 1), -- Solar School Retrofit
(6, 1), -- Downtown Rooftop Garden
(7, 1), -- Community Greenhouse Program
(8, 1), -- School Garden Expansion
(9, 1), -- Neighborhood Compost Initiative
(5, 2), -- Solar School Retrofit
(8, 2), -- School Garden Expansion
(15, 2), -- Back-to-School Supply Drive
(1, 3),  -- Community Center Renovation
(2, 3),  -- Affordable Housing Initiative
(3, 3),  -- Playground Restoration
(4, 3),  -- Bridge Safety Upgrade
(10, 3), -- Winter Clothing Drive
(12, 3), -- Food Bank Volunteer Campaign
(13, 3), -- Community Cleanup Day
(10, 4), -- Winter Clothing Drive (well-being support)
(11, 4); -- Senior Support Visits

