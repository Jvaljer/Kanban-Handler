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
    const username = req.query.username; // extract actual username value

    const sql = `
        SELECT *
        FROM projects
        WHERE projects.creator = '${username}';
    `; // bold but still works tho

    db.all(sql, (err, rows) => {
        if (err) console.error("!!! ", err.message);
        else {
            console.log("fetched: ", rows[0].name);
            res.json({ projects: rows }); // 'projects' because fetching as 'data.projects'.
        }
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