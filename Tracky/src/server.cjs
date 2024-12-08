const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('../../kanban.db', (err) => {
    if (err) console.error('Error connecting to DB: ', err.message);
    else console.log('Connected to SQLite DB !');
});

app.get('/projects', (req, res) => {
    const { username } = req.query;

    const sql = `
        SELECT projects.*
        FROM projects
        JOIN users ON users.username = projects.creator
        WHERE users.username = ?;
    `;

    db.all(sql, [username], (err, rows) => {
        if (err)
        {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ projects: rows });
    });
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error('Error closing DB: ', err.message);
        else console.log('DB connection closed.');

        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
});