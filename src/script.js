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