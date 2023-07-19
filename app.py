

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

# @app.route('/users/<user_id>', methods=['PUT'])
# def update_user(user_id):
#     user_updates = request.json
#     user_collection = mongo.db.users
#     user_collection.update_one({'_id': user_id}, {'$set': user_updates})
#     return jsonify({'message': f'Dish with ID {user_id} updated successfully'})

@app.route('/users/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    user_updates = request.json
    user_collection = mongo.db.users
    result = user_collection.replace_one({'_id': user_id}, user_updates)

    if result.modified_count == 1:
        return jsonify({'message': f'User with ID {user_id} updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404






@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Check if the user exists
    # user = mongo.db.users.find_one({'_id': user_id})
    # if not user:
    #     return jsonify({'message': 'User not found'}), 404

    # Delete the user from the database
    mongo.db.users.delete_one({'_id': user_id})

    return jsonify({'message': 'User deleted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)