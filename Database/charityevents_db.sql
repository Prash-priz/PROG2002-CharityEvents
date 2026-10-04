CREATE DATABASE charityevents_db;
USE charityevents_db;
CREATE TABLE organisation (
    organisation_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    website VARCHAR(255)
);
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
CREATE TABLE event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    organisation_id INT NOT NULL,
    category_id INT NOT NULL,
    event_name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    location VARCHAR(150) NOT NULL,
    ticket_price DECIMAL(10,2),
    fundraising_goal DECIMAL(10,2),
    amount_raised DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',

    FOREIGN KEY (organisation_id)
        REFERENCES organisation(organisation_id),

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);
INSERT INTO organisation
(name, description, email, phone, website)
VALUES
(
    'Hope Community Foundation',
    'A community charity supporting local families, education and health initiatives.',
    'info@hopecommunity.org',
    '0755551234',
    'https://www.hopecommunity.org'
);
INSERT INTO category (category_name)
VALUES
    ('Gala Dinner'),
    ('Fun Run'),
    ('Concert'),
    ('Silent Auction'),
    ('Community Fundraiser');
INSERT INTO event
(organisation_id, category_id, event_name, description, event_date, start_time, location, ticket_price, fundraising_goal, amount_raised,  status)
VALUES
(1, 1, 'Hope Gala Dinner',
 'An evening of dinner and entertainment to raise funds for local families.',
 '2026-10-20', '18:30:00', 'Gold Coast Convention Centre',
 75.00, 10000.00, 3500.00,  'active'),

(1, 2, 'Run for Hope',
 'A community fun run raising money for children and families in need.',
 '2026-11-08', '07:00:00', 'Broadwater Parklands',
 25.00, 5000.00, 1200.00,  'active'),

(1, 3, 'Music for Change',
 'A live music event featuring local artists supporting community programs.',
 '2026-11-21', '17:30:00', 'HOTA Gold Coast',
 40.00, 8000.00, 2100.00,  'active'),

(1, 4, 'Charity Silent Auction',
 'A silent auction featuring donated items with proceeds supporting education programs.',
 '2026-12-05', '18:00:00', 'Southport Community Centre',
 15.00, 6000.00, 900.00, 'active'),

(1, 5, 'Christmas Community Fundraiser',
 'A family-friendly Christmas fundraiser with food, activities and entertainment.',
 '2026-12-19', '12:00:00', 'Burleigh Heads',
 10.00, 4000.00, 500.00,  'active'),

(1, 2, 'Winter Charity Walk',
 'A community charity walk supporting local health initiatives.',
 '2026-07-18', '08:00:00', 'Surfers Paradise',
 20.00, 3000.00, 3000.00,  'active'),

(1, 3, 'Community Benefit Concert',
 'A fundraising concert supporting education opportunities for young people.',
 '2026-08-22', '19:00:00', 'Robina Community Centre',
 35.00, 7000.00, 7000.00, 'active'),

(1, 5, 'Spring Family Fundraiser',
 'A community fundraising day with games, food stalls and family activities.',
 '2026-10-25', '10:00:00', 'Coolangatta',
 10.00, 4500.00, 1500.00,  'suspended');
SELECT * FROM event;

