const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./kanban.db', (err) => {
    if (err) console.error('Error connecting to DB: ', err.message);
    else
    {
        console.log('Connected to SQLite DB !');

        // const sql = "SELECT * FROM sqlite_master WHERE type='table';";
        // db.all(sql, (err, rows) => {
        //     if (err) console.error("!!! ", err.message);
        //     else {
        //         console.log("tables > \n", rows);
        //     }
        // });
    }
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
            console.log("SQL - Server returns: (projects)", rows.map(r => r.name));
            res.json({ projects: rows }); // 'projects' because fetching as 'data.projects'.
        }
    });
});

app.get('/categories', async (req, res) => {
    const idList = req.query.projects;

    let categoryList = [];
    for (let id of idList)
    {
        const categories = await new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM categories
                WHERE categories.project_id = ${id};
            `;

            db.all(sql, (err, rows) => {
                if (err) reject(err); // rejecting promise on error
                else resolve(rows);
            });
        });
        // adding fetched categories
        categoryList.push(...categories);
    }
    console.log("SQL - Server returns: (categories)", categoryList.map(c => c.name));
    res.json({ categories: categoryList });
});


app.get('/states', async (req, res) => {
    const idList = req.query.projects;

    let stateList = [];
    for (let id of idList)
    {
        const states = await new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM states
                WHERE states.project_id = ${id};
            `;

            db.all(sql, (err, rows) => {
                if (err) reject(err); // rejecting promise on error
                else resolve(rows);
            });
        });
        // adding fetched categories
        stateList.push(...states);
    }
    console.log("SQL - Server returns: (state)", stateList.map(s => s.name));
    res.json({ states: stateList });
});

app.get('/tasks', async (req, res) => {
    const id = req.query.category;
    console.log("DEBUG - searching tasks for category n°",id);

    let taskList = [];
    const tasks = await new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM tasks
            WHERE tasks.category_id = ${id};
        `;
        db.all(sql, (err, rows) => {
            if (err) reject(err); // rejecting promise on error
            else resolve(rows);
        });
    });
    console.log("DEBUG - found tasks: ",tasks.map(t => t.name));
    // adding fetched categories
    taskList.push(...tasks);

    console.log("SQL - Server returns: (category: ",id,") (tasks)", taskList.map(t => t.name));
    res.json({ tasks: taskList });
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