// Arrays to store logs and recipes (temporary, until we add a back-end)
let logs = [];
let recipes = [];

// DOM Elements
const logForm = document.getElementById('log-form');
const recipeForm = document.getElementById('recipe-form');
const logsList = document.getElementById('logs-list');
const recipesList = document.getElementById('recipes-list');

// Function to display logs
function displayLogs() {
  logsList.innerHTML = logs
    .map(
      (log) => `
      <li>
        <strong>${log.date}</strong>: ${log.type} - ${log.notes}
      </li>
    `
    )
    .join('');
}

// Function to display recipes
function displayRecipes() {
  recipesList.innerHTML = recipes
    .map(
      (recipe) => `
      <li>
        <strong>${recipe.name}</strong><br>
        <em>Ingredients:</em> ${recipe.ingredients}<br>
        <em>Steps:</em> ${recipe.steps}
      </li>
    `
    )
    .join('');
}

// Handle Log Form Submission
logForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const type = document.getElementById('type').value;
  const notes = document.getElementById('notes').value;

  // Add log to the array
  logs.push({ date, type, notes });

  // Clear the form
  logForm.reset();

  // Update the display
  displayLogs();
});

// Handle Recipe Form Submission
recipeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('ingredients').value;
  const steps = document.getElementById('steps').value;

  // Add recipe to the array
  recipes.push({ name, ingredients, steps });

  // Clear the form
  recipeForm.reset();

  // Update the display
  displayRecipes();
});

// Initial display
displayLogs();
displayRecipes();

// Fetch logs from the backend
async function fetchLogs() {
  const response = await fetch("/api/logs");
  const data = await response.json();
  logsList.innerHTML = data.map(
    (log) => `<li><strong>${log.date}</strong>: ${log.type} - ${log.notes}</li>`
  ).join("");
}

// Fetch recipes from the backend
async function fetchRecipes() {
  const response = await fetch("/api/recipes");
  const data = await response.json();
  recipesList.innerHTML = data.map(
    (recipe) => `<li><strong>${recipe.name}</strong><br>
    <em>Ingredients:</em> ${recipe.ingredients}<br>
    <em>Steps:</em> ${recipe.steps}</li>`
  ).join("");
}

// Handle Log Submission
logForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newLog = {
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
    notes: document.getElementById("notes").value,
  };

  await fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLog),
  });

  fetchLogs();
  logForm.reset();
});

// Handle Recipe Submission
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newRecipe = {
    name: document.getElementById("recipe-name").value,
    ingredients: document.getElementById("ingredients").value,
    steps: document.getElementById("steps").value,
  };

  await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecipe),
  });

  fetchRecipes();
  recipeForm.reset();
});

// Fetch existing data on page load
fetchLogs();
fetchRecipes();
