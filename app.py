from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId

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


# @app.route('/movie/register', methods=['POST'])
# def create_movie():
#     data = request.get_json()
#     name = data.get('name')
#     image = data.get('image')
#     timing = data.get('timing')
#     price = data.get('price')

#     # Create a User object
#     movie = Movie(name=name, image=image, timing=timing,price=price)

#     # Insert the user document into MongoDB
#     mongo.db.movies.insert_one(movie.to_dict())

#     return jsonify({'message': 'movie has been added successfully'}), 201


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

# Create a new show for a movie
# @app.route('/movies/<movie_id>/shows', methods=['POST'])
# def create_show(movie_id):
#     data = request.get_json()
#     movie_id=ObjectId(movie_id)
#     data["movie_id"] = movie_id
#     show_collection = mongo.db.shows
#     show_id = show_collection.insert_one(data).inserted_id
#     return jsonify({"message": "Show created successfully", "show_id": str(show_id)}), 201


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


if __name__ == '__main__':
    app.run(debug=True)