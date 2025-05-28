
// Data storage
let meals = [];
let workouts = [];

// DOM Elements
const mealForm = document.getElementById('meal-form');
const workoutForm = document.getElementById('workout-form');
const mealsList = document.getElementById('meals-list');
const workoutsList = document.getElementById('workouts-list');
const consumedCalories = document.getElementById('consumed-calories');
const burnedCalories = document.getElementById('burned-calories');
const netCalories = document.getElementById('net-calories');
const netStatus = document.getElementById('net-status');
const calorieProgress = document.getElementById('calorie-progress');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderMeals();
    renderWorkouts();
    updateSummary();
});

// Meal Form Submission
mealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mealName = document.getElementById('meal-name').value;
    const mealCalories = parseInt(document.getElementById('meal-calories').value);
    const mealCategory = document.getElementById('meal-category').value;
    
    if (mealName && !isNaN(mealCalories)) {
        const meal = {
            id: Date.now(),
            name: mealName,
            calories: mealCalories,
            category: mealCategory,
            timestamp: new Date()
        };
        
        meals.push(meal);
        saveData();
        renderMeals();
        updateSummary();
        
        // Reset form
        mealForm.reset();
    }
});

// Workout Form Submission
workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const workoutName = document.getElementById('workout-name').value;
    const workoutCalories = parseInt(document.getElementById('workout-calories').value);
    const workoutDuration = parseInt(document.getElementById('workout-duration').value);
    
    if (workoutName && !isNaN(workoutCalories) && !isNaN(workoutDuration)) {
        const workout = {
            id: Date.now(),
            name: workoutName,
            calories: workoutCalories,
            duration: workoutDuration,
            timestamp: new Date()
        };
        
        workouts.push(workout);
        saveData();
        renderWorkouts();
        updateSummary();
        
        // Reset form
        workoutForm.reset();
    }
});

// Render meals list
function renderMeals() {
    if (meals.length === 0) {
        mealsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <p>No meals added today</p>
                <p class="small">Add your first meal to get started</p>
            </div>
        `;
        return;
    }
    
    mealsList.innerHTML = '';
    
    // Group meals by category
    const mealsByCategory = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
    };
    
    meals.forEach(meal => {
        mealsByCategory[meal.category].push(meal);
    });
    
    // Render each category
    for (const category in mealsByCategory) {
        const categoryMeals = mealsByCategory[category];
        if (categoryMeals.length === 0) continue;
        
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
        mealsList.innerHTML += `
            <div class="category-header mb-2 mt-3">
                <h6 class="text-uppercase fw-bold opacity-75">${categoryTitle}</h6>
            </div>
        `;
        
        categoryMeals.forEach(meal => {
            mealsList.innerHTML += `
                <div class="list-group-item">
                    <div>
                        <div class="fw-bold">${meal.name}</div>
                        <small class="opacity-75">${formatTime(meal.timestamp)}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="badge bg-primary me-2">${meal.calories} kcal</span>
                        <button class="delete-btn" onclick="deleteMeal(${meal.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

// Render workouts list
function renderWorkouts() {
    if (workouts.length === 0) {
        workoutsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-running"></i>
                <p>No workouts added today</p>
                <p class="small">Add your first workout to get started</p>
            </div>
        `;
        return;
    }
    
    workoutsList.innerHTML = '';
    
    workouts.forEach(workout => {
        workoutsList.innerHTML += `
            <div class="list-group-item">
                <div>
                    <div class="fw-bold">${workout.name}</div>
                    <small class="opacity-75">${workout.duration} min • ${formatTime(workout.timestamp)}</small>
                </div>
                <div class="d-flex align-items-center">
                    <span class="badge bg-success me-2">-${workout.calories} kcal</span>
                    <button class="delete-btn" onclick="deleteWorkout(${workout.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

// Update summary
function updateSummary() {
    const totalConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalBurned = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    const net = totalConsumed - totalBurned;
    
    consumedCalories.textContent = totalConsumed;
    burnedCalories.textContent = totalBurned;
    netCalories.textContent = net;
    
    // Update net status and color
    if (net < 0) {
        netStatus.textContent = "Calorie Deficit";
        netStatus.className = "text-success";
        netCalories.className = "calorie-display text-success";
    } else if (net > 0) {
        netStatus.textContent = "Calorie Surplus";
        netStatus.className = "text-danger";
        netCalories.className = "calorie-display text-danger";
    } else {
        netStatus.textContent = "Balanced";
        netStatus.className = "text-info";
        netCalories.className = "calorie-display text-info";
    }
    
    // Update progress bar (for demonstration purposes)
    const progressPercentage = Math.min(100, (totalConsumed / 2000) * 100);
    calorieProgress.style.width = `${progressPercentage}%`;
    
    // Change progress bar color based on progress
    if (progressPercentage > 90) {
        calorieProgress.className = "progress-bar bg-danger";
    } else if (progressPercentage > 70) {
        calorieProgress.className = "progress-bar bg-warning";
    } else {
        calorieProgress.className = "progress-bar bg-success";
    }
}

// Delete a meal
function deleteMeal(id) {
    meals = meals.filter(meal => meal.id !== id);
    saveData();
    renderMeals();
    updateSummary();
}

// Delete a workout
function deleteWorkout(id) {
    workouts = workouts.filter(workout => workout.id !== id);
    saveData();
    renderWorkouts();
    updateSummary();
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('calorieTracker_meals', JSON.stringify(meals));
    localStorage.setItem('calorieTracker_workouts', JSON.stringify(workouts));
}

// Load data from localStorage
function loadData() {
    const savedMeals = localStorage.getItem('calorieTracker_meals');
    const savedWorkouts = localStorage.getItem('calorieTracker_workouts');
    
    if (savedMeals) meals = JSON.parse(savedMeals);
    if (savedWorkouts) workouts = JSON.parse(savedWorkouts);
}