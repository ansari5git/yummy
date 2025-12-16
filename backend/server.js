const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
const pool = require("./db");

app.post("/order", async (req, res) => {
  try {
    const { name, email, phone, food, address } = req.body;

    await pool.query(
      "INSERT INTO orders (name, email, phone, food, address) VALUES ($1,$2,$3,$4,$5)",
      [name, email, phone, food, address]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
