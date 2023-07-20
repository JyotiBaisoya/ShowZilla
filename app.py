from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://jyotibaisoya:baisoya@cluster0.0gxpf.mongodb.net/ShowZillaDb?retryWrites=true&w=majority'  

mongo = PyMongo(app)


class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password
        }



class Movie:
    def __init__(self, name, image, description,duration,price,shows):
        self.name = name
        self.image = image
        self.description = description 
        self.duration = duration
        self.price = price
        self.shows = shows

    def to_dict(self):
        return {
            'name': self.name,
            'image': self.image,
            'description': self.description,
            'timing': self.timing,
            'price': self.price,
            'shows': self.shows
        }

class Show:
    def __init__(self, movie_id, timing, category,price):
       self.movie_id = movie_id
       self.timing = timing
       self.category = category
       self.price = price 

    def to_dict(self):
        return {
            'movie_id': self.movie_id,
            'timing' : self.timing,
            'category': self.category,
            'price' : self.prcie
        }



class Event:
    def __init__(self, title,description,date,participants):
      self.title = title
      self.description = description
      self.date = date
      self.participants = participants
    def to_dict(self):
        return {
             'title': self.title,
             'description':self.description,
             'date': self.date,
             'participants':self.participants
        }

class Participants:
    def __init__(self, name,email,event):
      self.name = name
      self.email = email
      self.event = event
     
    def to_dict(self):
        return {
             'name': self.name,
             'email': self.email,
             'event': self.event
        }

class EventParticipants:
    def __init__(self, event_id,participant_id):
      self.event_id = event_id
      self.participant_id = participant_id
     
    def to_dict(self):
        return {
             'event_id': self.event_id,
             'participant_id': self.participant_id
        }

class EventBooking:
    def __init__(self, user_id,event_id,num_tickets,booking_date):
      self.user_id = user_id
      self.event_id = event_id
      self.num_tickets = num_tickets
      self.booking_date = booking_date
     
    def to_dict(self):
        return {
            'user_id':self.user_id,
            'event_id':self.event_id,
            'num_tickets':self.num_ticekts,
            'booking_date':self.booking_date
        }


class MovieBooking:
    def __init__(self, user_id,movie_id,num_tickets,booking_date):
      self.user_id = user_id
      self.movie_id = movie_id
      self.num_tickets = num_tickets
      self.booking_date = booking_date
     
    def to_dict(self):
        return {
            'user_id':self.user_id,
            'movie_id':self.movie_id,
            'num_tickets':self.num_ticekts,
            'booking_date':self.booking_date
        }


@app.route('/users/register', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Create a User object
    user = User(name=name, email=email, password=password)

    # Insert the user document into MongoDB
    mongo.db.users.insert_one(user.to_dict())

    return jsonify({'message': 'User created successfully'}), 201




@app.route("/users/login",methods=["POST"])
def login_user():
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")

    user = mongo.db.users.find_one({"name":name})
    if user:
        if user["password"]==password:
          return jsonify({"message":"user logged in successfully"})
        else:
            return jsonify({"message":"wrong password"})
    else:
        return jsonify({"message":"user does not exist"})





@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    # Update an existing user in the database based on the request data
    user_id = ObjectId(user_id)

    data = request.get_json()
    user_collection=mongo.db.users
    updated_user = user_collection.update_one({"_id": user_id}, {"$set": data})
    if updated_user.modified_count > 0:
        return jsonify({"message": "User updated successfully"}), 200
    return jsonify({"message": "User not found"}), 404





@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_id = ObjectId(user_id)
    # Check if the user exists
    user = mongo.db.users.find_one({'_id': user_id})
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Delete the user from the database
    mongo.db.users.delete_one({'_id': user_id})

    return jsonify({'message': 'User deleted successfully'}), 200





# Create a new movie
@app.route('/movies', methods=['POST'])
def create_movie():
    data = request.get_json()
    movie_collection = mongo.db.movies
    movie_id = movie_collection.insert_one(data).inserted_id
    return jsonify({"message": "Movie created successfully", "movie_id": str(movie_id)}), 201

# Get all movies
@app.route('/movies', methods=['GET'])
def get_all_movies():
    movie_collection = mongo.db.movies
    movies = list(movie_collection.find({}, {"_id": 0}))
    return jsonify(movies)

# Get a specific movie by movie_id
@app.route('/movies/<movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie_id = ObjectId(movie_id)
    movie_collection = mongo.db.movies
    movie = movie_collection.find_one({"_id": movie_id}, {"_id": 0})
    if movie:
        return jsonify(movie)
    return jsonify({"message": "Movie not found"}), 404




@app.route('/movies/<movie_id>/shows', methods=['POST'])
def create_show(movie_id):
    data = request.get_json()
    movie_id=ObjectId(movie_id)
    data["movie_id"] = movie_id
    show_collection = mongo.db.shows
    movie_collection = mongo.db.movies
    show_id = show_collection.insert_one(data).inserted_id

    # Add the show to the shows array of the respective movie
    movie_collection.update_one(
        {"_id": movie_id},
        {"$push": {"shows": data}}
    )

    return jsonify({"message": "Show created successfully", "show_id": str(show_id)}), 201


# Get all shows for a specific movie
@app.route('/movies/<movie_id>/shows', methods=['GET'])
def get_all_shows_for_movie(movie_id):
    show_collection = mongo.db.shows
    movie_id = ObjectId(movie_id)
    shows = list(show_collection.find({"movie_id": movie_id}, {"_id": 0}))
    return jsonify(shows)

 # Backend API Endpoint for creating an event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event_collection = mongo.db.events
    event_id = event_collection.insert_one(data).inserted_id
    return jsonify({"message": "Event created successfully", "event_id": str(event_id)}), 201

# Backend API Endpoint for getting all events
@app.route('/events', methods=['GET'])
def get_all_events():
    event_collection = mongo.db.events
    events = list(event_collection.find({}))
    for event in events:
       event["_id"] = str(event["_id"])

    return jsonify(events)


# Backend API Endpoint for creating a participant
@app.route('/participants', methods=['POST'])
def create_participant():
    data = request.get_json()
    participant_collection = mongo.db.participants
    participant_id = participant_collection.insert_one(data).inserted_id
    return jsonify({"message": "Participant created successfully", "participant_id": str(participant_id)}), 201

# Backend API Endpoint for getting all participants
@app.route('/participants', methods=['GET'])
def get_all_participants():
    participant_collection = mongo.db.participants
    participants = list(participant_collection.find({}))
    for participant in participants:
       participant["_id"] = str(participant["_id"])
    return jsonify(participants)


# Backend API Endpoint for adding a participant to an event
@app.route('/events/<event_id>/participants', methods=['POST'])
def add_participant_to_event(event_id):
    data = request.get_json()
   
    event_id = ObjectId(event_id)
    participant_id = data.get("participant_id")
    event_participant_collection = mongo.db.EventParticipants
    event_collection = mongo.db.events
    participant_collection = mongo.db.participants
    if participant_id:
        relationship_data = {
            "event_id": event_id,
            "participant_id": participant_id
        }
        relationship_id = event_participant_collection.insert_one(relationship_data).inserted_id

        # Add the participant_id to the "participants" array of the event
        event_collection.update_one(
            {"_id": event_id},
            {"$push": {"participants": participant_id}}
        )

        # Add the event_id to the "events" array of the participant
        participant_collection.update_one(
            {"_id": participant_id},
            {"$push": {"events": event_id}}
        )

        return jsonify({"message": "Participant added to event successfully", "relationship_id": str(relationship_id)}), 201
    else:
        return jsonify({"error": "Participant ID not provided"}), 400


# Backend API Endpoint for getting participants for an event
@app.route('/events/<event_id>/participants', methods=['GET'])
def get_event_participants(event_id):
    event_id = ObjectId(event_id)
    event_collection = mongo.db.events
    participant_collection = mongo.db.participants
    event = event_collection.find_one({"_id": event_id}, {"_id": 0})
    if event:
        participant_ids = [ObjectId(participant_id) for participant_id in event.get("participants", [])]
        participants = list(participant_collection.find({"_id": {"$in": event.get("participants", [])}}))
        return jsonify(participants)
    return jsonify({"message": "Event not found"}), 404



# Backend API Endpoint for booking an event
@app.route('/events/<event_id>/book', methods=['POST'])
def book_event(event_id):
    data = request.get_json()
    user_id = data.get("user_id")
    num_tickets = data.get("num_tickets")
    event_collection = mongo.db.events
    event_booking_collection = mongo.db.eventbookings

    # Validate user_id and num_tickets
    if not user_id or not num_tickets or num_tickets <= 0:
        return jsonify({"error": "Invalid user ID or number of tickets"}), 400

    # Check if the event exists
    event = event_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        return jsonify({"error": "Event not found"}), 404

    # Perform the booking
    booking_data = {
        "user_id": user_id,
        "event_id": event_id,
        "num_tickets": num_tickets,
        "booking_date": datetime.now()
    }
    booking_id = event_booking_collection.insert_one(booking_data).inserted_id
    return jsonify({"message": "Event booked successfully", "booking_id": str(booking_id)}), 201

from datetime import datetime

# Backend API Endpoint for booking a movie
@app.route('/movies/<movie_id>/book', methods=['POST'])
def book_movie(movie_id):
    data = request.get_json()
    user_id = data.get("user_id")
    num_tickets = data.get("num_tickets")
    movie_collection =mongo.db.movies
    movie_booking_collection = mongo.db.moviebookings
    # Validate user_id and num_tickets
    if not user_id or not num_tickets or num_tickets <= 0:
        return jsonify({"error": "Invalid user ID or number of tickets"}), 400

    # Check if the movie exists
    movie = movie_collection.find_one({"_id": ObjectId(movie_id)})
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    # Perform the booking
    booking_data = {
        "user_id": user_id,
        "movie_id": movie_id,
        "num_tickets": num_tickets,
        "booking_date": datetime.now()
    }
    booking_id = movie_booking_collection.insert_one(booking_data).inserted_id
    return jsonify({"message": "Movie booked successfully", "booking_id": str(booking_id)}), 201

# Backend API Endpoint for getting all movie bookings
@app.route('/moviebookings', methods=['GET'])
def get_all_movie_bookings():
    movie_booking_collection = mongo.db.moviebookings
    movie_bookings = list(movie_booking_collection.find({}))

    # Convert ObjectId to string representation
    for booking in movie_bookings:
        booking["_id"] = str(booking["_id"])

    return jsonify(movie_bookings)

# Backend API Endpoint for getting all event bookings
@app.route('/eventbookings', methods=['GET'])
def get_all_event_bookings():
    event_booking_collection = mongo.db.eventbookings
    event_bookings = list(event_booking_collection.find({}))

    # Convert ObjectId to string representation
    for booking in event_bookings:
        booking["_id"] = str(booking["_id"])

    return jsonify(event_bookings)


if __name__ == '__main__':
    app.run(debug=True)