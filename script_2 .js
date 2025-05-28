// Data storage
let meals = [];
let workout = [];

// DOM Elements 
const  mealForm = document.getElementById('meal-form');
const workoutForm = document.getElementById('workout-form');
const mealsList = document.getElementById('meals-list');
const workoutsList = document.getElementById('workout-list');
const consumedCalories = document.getElementById("consumed-calories");
const burnedCalories =  document.getElementById('burned-calories')
const netCalories = document.getElementById('net-calories')
const netStatus = document.getElementById('net-status')
const calorieProgress = document.getElementById('calorie-progress');


// Initialize the app

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderMeals();
    renderWorkouts();
    updateSummary()
} );



// Meal Form Submission 
mealForm.addEventListener('submit,', (e) =>{
    e.preventDefault();

    const mealName = document.getElementById('meal-name').value;
    const mealCalories = parseInt(document.getElementById('meal-calories').value);
    const mealCategory = document.getElementById('meal-category').value;

    if(mealName && !isNaN(mealCalories)) {

        const meal = {
            id: Date.now(),
            name:mealName,
            calories:mealCalories,
            category:mealCategory,
            timestamp:new Date()
        };

        meals.push(meal);
        saveData();
        renderMeals();
        updateSummary();

        // Rest Form
        mealForm.rest();
    }
});


// Workout Form Submission
workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const workoutName = document.getElementById('workout-name').value;
    const workoutCalories = parseInt(document.getElementById('workout-calories').value);
    const workoutDuration = parseInt(document.getElementById('workout-duration').value);


    if(workoutName && !isNaN(workoutCalories) && !isNaN(workoutDuration)) {
        const workout = {
            id: Date.now(),
            name:workoutName,
            calories:workoutCalories,
            duration:workoutDuration,
            timestamp:new Date()
        };

        workouts.push(workout);
        saveData();
        renderWorkouts();
        updateSummary();

        // Rest Form
        workoutForm.rest();
    }
    

});


// Render meals list
function renderMeals(){
    if(meals.length === 0) {
        mealsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <p>No meals added today</p>
                <p class="small">Add your meal to get stated</p>
        
            </div>
        `;

        return;
    }

    mealsList.innerHTML = '';
}