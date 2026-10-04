const express = require('express');
const path = require('path');
const db = require('./event_db');

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Get active upcoming events
app.get('/api/events', (req, res) => {

    const sql = `
        SELECT event.*, category.category_name
        FROM event
        JOIN category
        ON event.category_id = category.category_id
        WHERE event.status = 'active'
        AND event.event_date >= CURDATE()
        ORDER BY event.event_date ASC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving events:', err);
            return res.status(500).json({
                error: 'Failed to retrieve events'
            });
        }

        res.json(results);
    });
});



// Get all event categories
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM category ORDER BY category_name';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving categories:', err);
            return res.status(500).json({
                error: 'Failed to retrieve categories'
            });
        }

        res.json(results);
    });
});


// Search active events
app.get('/api/events/search', (req, res) => {
    const { date, location, category } = req.query;

    let sql = `
        SELECT event.*, category.category_name
        FROM event
        JOIN category
        ON event.category_id = category.category_id
        WHERE event.status = 'active'
    `;

    const values = [];

    if (date) {
        sql += ' AND event.event_date = ?';
        values.push(date);
    }

    if (location) {
        sql += ' AND event.location LIKE ?';
        values.push(`%${location}%`);
    }

    if (category) {
        sql += ' AND event.category_id = ?';
        values.push(category);
    }

    sql += ' ORDER BY event.event_date ASC';

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error searching events:', err);
            return res.status(500).json({
                error: 'Failed to search events'
            });
        }

        res.json(results);
    });
});


// Get one event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;

    const sql = `
        SELECT event.*, category.category_name
        FROM event
        JOIN category
        ON event.category_id = category.category_id
        WHERE event.event_id = ?
    `;

    db.query(sql, [eventId], (err, results) => {
        if (err) {
            console.error('Error retrieving event:', err);
            return res.status(500).json({
                error: 'Failed to retrieve event'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }

        res.json(results[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});