# Professional Calorie Tracker App

We are going to create a professional Calorie Tracker web application using HTML, Bootstrap 5, CSS (with gradients), and vanilla JavaScript.

The app will have the following features:

1. Track meals: input food items with calories.

2. Track workouts: input exercise with calories burned.

3. Calculate total calories consumed and burned.

4. Display a summary (net calories).

Steps:

1. Set up the HTML structure with Bootstrap 5.

2. Design the interface with two main sections: one for meals and one for workouts, and a summary section.

3. Use a gradient color scheme for a professional look.

4. Write JavaScript to handle:

- Adding and removing meal entries.

- Adding and removing workout entries.

- Calculating the totals.

- Updating the UI.

Detailed Steps:

Step 1: HTML Structure

- Include Bootstrap 5 CSS and JS (from CDN).

- Create a container for the app.

- Divide the app into:

a. Header with title.

b. Two columns (for meals and workouts) and a summary row at the top or bottom.

c. Each column has:

- A form to add new entries (with description and calories).

- A list to display the entries with a delete button.

- Summary section to display:

- Total calories consumed.

- Total calories burned.

- Net calories (consumed - burned).

Step 2: CSS Styling

- Use a gradient background for the entire app or for specific components.

- Style the input forms and lists to look professional.

Step 3: JavaScript

- Create arrays to store meal and workout entries.

- Functions to:

- Add a meal: push to meals array, update UI, and update totals.

- Add a workout: push to workouts array, update UI, and update totals.

- Remove a meal: remove from array by id, update UI, and update totals.

- Remove a workout: remove from array by id, update UI, and update totals.

- Calculate totals: loop through meals and workouts, then update the summary.

Step 4: Data Structure for Entries

- Each entry (meal or workout) will be an object with:

id: unique identifier (using Date.now() or incrementing number)

name: description of the entry

calories: number

Step 5: Update UI

- When adding or removing, re-render the respective list (meals or workouts) and update the summary.

Step 6: Local Storage (optional for persistence)

- We can store the arrays in localStorage so that data persists on refresh.

Let's start coding:

Note: We'll use Bootstrap classes for layout and styling. For the gradient, we can use a background gradient on the body or specific containers.

We'll create:

index.html

style.css

script.js
