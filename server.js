import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API to fetch all listings
app.get('/api/listings', (req, res) => {
    let connection = mysql.createConnection(config);
    
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ error: "Database connection failed" });
        }
        
        console.log("Connected to database!");
        
        let sql = "SELECT * FROM Listings";
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                res.status(500).json({ error: "Database query failed" });
            } else {
                console.log("Results retrieved:", results.length);
                res.json(results);
            }
            connection.end();
        });
    });
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

