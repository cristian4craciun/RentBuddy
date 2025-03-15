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

let connection = mysql.createConnection(config);
    
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
    }
    
    console.log("Connected to database!");

// API to fetch all listings
app.get('/api/listings', (req, res) => {
        let sql = "SELECT * FROM Listings";
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                res.status(500).json({ error: "Database query failed" });
            } else {
                console.log("Results retrieved:", results.length);
                res.json(results);
            }
        });
    });
});

// Create user profile
app.post('/api/users', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        bio,
        profileImage
      } = req.body;
  
      // Validate required fields
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ 
          error: 'Missing required fields. First name, last name, and email are required.' 
        });
      }
  
      const connection = await pool.getConnection();
      
      try {
        const [result] = await connection.execute(
          `INSERT INTO Users (
            firstName, lastName, email, phone, address, city, state, zipCode, bio, profileImage
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [firstName, lastName, email, phone, address, city, state, zipCode, bio, profileImage]
        );
  
        res.status(201).json({
          message: 'User profile created successfully',
          userId: result.insertId
        });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).json({ error: 'Failed to create user profile' });
    }
  });
  
  // Get user profile by ID
  app.get('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const connection = await pool.getConnection();
      
      try {
        const [rows] = await connection.execute(
          'SELECT * FROM Users WHERE id = ?',
          [userId]
        );
  
        if (rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.status(200).json(rows[0]);
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
  });

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

