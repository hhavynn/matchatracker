import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

// Temporary storage (replace with a database later)
let logs = [];
let recipes = [];

// Routes
app.get("/", (req, res) => res.send("Matcha Tracker API Running"));

// Get all logs
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

// Add a new log
app.post("/api/logs", (req, res) => {
  const newLog = req.body;
  logs.push(newLog);
  res.status(201).json(newLog);
});

// Get all recipes
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// Add a new recipe
app.post("/api/recipes", (req, res) => {
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
