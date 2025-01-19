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
            console.log("fetched (projects): ", rows.map(r => r.name));
            res.json({ projects: rows }); // 'projects' because fetching as 'data.projects'.
        }
    });
});

app.get('/categories', async (req, res) => {
    const idList = req.query.projects;
    console.log("Searching for ids -> ", idList);

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
                else 
                {
                    console.log("fetched (categories): ", rows.map(r => r.name), " ...");
                    resolve(rows);
                }
            });
        });
        // adding fetched categories
        categoryList.push(...categories);
        console.log("DONE WITH ",id);
    }
    console.log("##### returning categories - \n",categoryList,"\n#####");
    res.json({ categories: categoryList });
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