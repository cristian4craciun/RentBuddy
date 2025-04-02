import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import admin from 'firebase-admin'
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://msci342-project-50a9a-default-rtdb.firebaseio.com/"
});

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

    // to see table structure
    connection.query("DESCRIBE Listings", (err, results) => {
      if (err) {
        console.error("Error describing Listings table:", err);
      } else {
        console.log("📋 Listings Table Structure:");
        console.table(results);
      }
    });
    

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

// API to fetch all users
app.get('/api/users', (req, res) => {
  let sql = "SELECT * FROM Users";
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


app.post('/api/auth', async (req, res) => {
  const { idToken } = req.body;

  try {
      // Verify Firebase ID Token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { email } = decodedToken;

      if (!email) {
          return res.status(400).json({ error: "Invalid token, email not found" });
      }

      connection.query("SELECT * FROM Users WHERE email = ?", [email], (error, results) => {
          if (error) {
              console.error("Database error:", error);
              return res.status(500).json({ error: "Database error" });
          }

          if (results.length > 0) {
              // User found, return the existing user
              return res.status(200).json({ user: results[0] });
          } else {
              // 🆕 Create new user with default values
              const newUser = {
                first_name: decodedToken.name || "",
                last_name: "",
                email: email,
                password_hash: "",
                university: "",
                year_of_study: null,
                gender: null,
                contact_method: null,
                phone_number: "",
                smoking_preference: null,
                pet_friendly: null,
                sleep_schedule: null,
                bio: "",
              };
              
              connection.query(
                  `INSERT INTO Users (first_name, last_name, email, password_hash, university,
                    year_of_study, gender, contact_method, phone_number,
                    smoking_preference, pet_friendly, sleep_schedule, bio
                  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  Object.values(newUser),
                  (error, result) => {
                      if (error) {
                          console.error("Error creating new user:", error);
                          return res.status(500).json({ error: "Failed to create user" });
                      }

                      newUser.id = result.insertId;
                      return res.status(201).json({ user: newUser });
                  }
              );
          }
      });
  } catch (error) {
      console.error("Firebase Auth Error:", error);
      res.status(401).json({ error: "Unauthorized" });
  }
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

