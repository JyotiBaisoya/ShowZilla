# ShowZilla

# Description
The Movie and Event Management System is a web application that allows users to view and book movies and events. The system provides a user-friendly interface to browse through a list of available movies and events, view their details, and make bookings. It also provides a booking history for users to keep track of their reservations.

# Features
View a list of available movies and events.
View detailed information about each movie and event, such as description, duration, image, and price.
Book movie tickets and event passes.
View the booking history with details of previous reservations.
Secure system for user login and registration.


# Technologies Used
## Frontend:
React.js for building user interfaces.
Axios for making API requests to the backend.
React Router for navigation between different pages.
Bootstrap for responsive and mobile-friendly UI design.

## Backend:
Flask, a lightweight web framework for Python.
Flask-CORS to handle Cross-Origin Resource Sharing.
PyMongo to interact with the MongoDB database.


## Database:
MongoDB, a NoSQL database, to store movies, events, and user information.

# Installation
Clone the repository:
git clone https://github.com/JyotiBaisoya/ShowZilla.git

cd movie-event-management/frontend
npm install

cd ../backend
pip install -r requirements.txt
Set up the database:
Make sure you have MongoDB installed and running.
Create a new MongoDB database for the project and update the database connection URL in backend/app.py.

# In the frontend directory:
npm start

# In the backend directory:
python app.py
Access the application in your web browser:
Open http://localhost:3000 to access the ShowZilla.

# Usage
Register a new account or log in with your existing credentials.
Explore the list of available movies and events on the homepage.
Click on a movie or event to view more details.
If you wish to book a movie or event, click on the "Book Now" button and select the number of tickets/passes.
The booking will be added to your booking history.
To manage movies, events, or view all bookings (admin panel), log in with admin credentials.

# Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or feature enhancements.

# Acknowledgments
React.js Documentation
Flask Documentation
MongoDB Documentation
Bootstrap Documentation
