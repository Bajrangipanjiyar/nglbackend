require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// CORS allow karega Vercel frontend se aane wali requests ko
app.use(cors());
app.use(express.json());

// Neon DB Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true }
});

// ==========================================
// 🚀 1. PING / WAKE-UP ROUTE
// ==========================================
// Ye route Render server ko jagaye rakhne ke liye use hoga
app.get('/', (req, res) => {
    res.status(200).send('UniWhisper Backend is awake and running! 🚀');
});

// ==========================================
// 📩 2. SAVE MESSAGE ROUTE
// ==========================================
app.post('/api/message', async (req, res) => {
  try {
    const { instagram_username, message } = req.body;

    // Validation
    if (!instagram_username || !message) {
      return res.status(400).json({ error: "Username aur message zaroori hain!" });
    }

    // Database me insert karna (tumhari messages table me)
    const newQuery = await pool.query(
      "INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING *",
      [instagram_username, message]
    );

    res.status(200).json({ success: true, data: newQuery.rows[0] });
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Server error, please try again." });
  }
});

// Port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));