# Deploying (Custom)

run `yarn build` to build the files

run `yarn copybuild` to prepare build directory in server

switch to server

run `git push heroku master` to deploy build

# EasyCal

**EasyCal** is a modern calorie counting app that makes nutrition tracking easy: _<http://easycal.io>_

![EasyCal Home Page](/README/todays-log.png "EasyCal Home Page")

If you'd like to start counting your calories and tracking your exercise, you can register an account with just an email address and password! To take it for a test run, try these login credentials:

**Email Address:** easycal@test.com

**Password**: easycal

---

[**Technology**](#technology)

[**Libraries Used**](#libraries-used)

[**Features**](#features)

[**Component Hierarchy**](#component-hierarchy)

[**Deployment**](#deployment)

---

## Technology

The frontend of EasyCal is built using React with React Router. I'm most familiar with Java as a backend language, so all REST endpoints use Play! 1.4.4, a Java-powered MVC web framework. For details on the data models and implementations, visit the backend repo [here](https://github.com/mileshenrichs/easycal-backend). All food and nutrition data comes from the [USDA Food Composition Databases](https://ndb.nal.usda.gov/ndb/doc/index).

## Libraries Used

-   **[immutability-helper](https://www.npmjs.com/package/immutability-helper):** Immutability helper's `update()` function made nested state objects easy to update without mutation
-   **[react-day-picker](https://www.npmjs.com/package/react-day-picker):** React Day Picker provided a ready-to-use date selection utility to navigate daily logs and set specific date ranges for which to view statistics
-   **[moment.js](https://www.npmjs.com/package/moment):** Moment's helpful date utilities came in handy for setting and displaying dates on the Stats page
-   **[react-highcharts](https://www.npmjs.com/package/react-highcharts):** React Highcharts allowed for rendering and updating of a [Highcharts](https://www.highcharts.com/)-powered food & exercise graph on the Stats page
-   **[qs](https://www.npmjs.com/package/qs):** qs allowed for parsing of query strings throughout the application
-   **[react-favicon](https://www.npmjs.com/package/react-favicon):** For whatever reason, I was having trouble getting my `favicon.ico` file in `/public` to show up, but react-favicon did the trick

## Features

-   Search for food through the USDA Food Composition Databases
-   Add foods to your daily log, differentiated by meal (breakfast, lunch, dinner, snacks)
-   Easily find frequent foods by browsing **recent foods** list
-   Create custom foods
-   View food log for any day of your choosing using the date navigator on the home page
-   Modify serving sizes of foods in your log
-   Remove foods from your log
-   Enter calories burned from exercise each day
-   Set daily calorie and nutrient goals, see progress towards those goals in the daily log
-   View nutrition breakdowns for any date range: total and average macro **and** micro nutrients
-   See a graph of food consumption and exercise over time

## Component Hierarchy

### DayView: home screen, daily food log

**DayView** is the home page of EasyCal. It's where you view the foods you've eaten throughout the day, and input your exercise.
Contains components:

-   **DaySelect**: choose which day to view food log of, implements _react-day-picker_
-   **Calotron**: display net calories for given day (`caloriesEaten - caloriesBurned`)
-   **MealGroup:** list/table of foods eaten for a given meal (contains **MealItem**, **AddFoodItem**, and **MealTotalsRow**)
-   **ActivityInput**: input calories burned from exercise
-   **NetCalories**: show equation that calculates day's net calories
-   **MacroTotals**: show the day's macronutrient intake and how close each is to user's goal

### AddFoodView: search foods, select serving size, add to log

**AddFoodView** allows users to search for foods, view recent foods, and create new foods to add to their daily log.
Contains components:

-   **SearchFood**: search bar allowing access to USDA foods database
-   **FoodsPanel**: tabs to navigate between **SearchResults**, **RecentFoods**, and **MyFoods** components (each of which contains **AddableFoodItem** components)
-   **CreateFoodView**: not technically contained by **AddFoodView**, but closely related; provides form through which users and create their own foods with serving size and nutrition information

### StatisticsView: cumulative statistics, calories graph

**StatisticsView** is a useful way of evaluating your dietary habits over time. Here, you can view a more detailed breakdown of the foods you eat, including micronutrients like fiber, sugar, and sodium.
Contains components:

-   **StatsTable**: day-by-day breakdown of total calories and nutrients (contains **StatsDayItem**)
-   **WeekAverages**: table that shows average calories and nutrients during selected date period
-   **ExerciseGraph**: Highcharts line graph illustrating calories burned and calories consumed over time

### MyAccountView: set goals, log out

**MyAccountView** allows users to set & save their calorie and nutrient goals.
Contains components:

-   **MyGoals**: form to set/modify user goals

### Utility/Miscellaneous Components

-   **LogInView**: log in or register an account; users are redirected here if their login token (a [JSON Web Token](https://jwt.io/)) is absent or invalid
-   **Header**: site header, contains logo and navigation
-   **Footer**: standard footer, contains logo and nav links
-   **AuthLoader**: full-screen loading spinner to hide **DayView** when app is initally loaded and waiting for authentication results from [backend](https://github.com/mileshenrichs/easycal-backend)

## Deployment

Deployment was a little tricky on both the front- and back-end. Since `npm run build` creates a static directory, I was able to upload these files to the Namecheap hosting account I purchased with my domain via cPanel's interface. I had to switch from using `BrowserRouter` to `HashRouter` to prevent my frontend server from looking for directories for each of my routes (i.e. `/stats`, `/add`, etc).
