// import React, { useState, useEffect } from 'react';

// const ProfilePage = () => {

//   const [user, setUser] = useState(null);

//   useEffect(() => {
    
//     // // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
//     // axios.get('http://127.0.0.1:5000/users/64b973cd582da16caa7072ea')
//     //   .then((response) => {
//     //     // Handle the successful response and update the state with the data
//     //     setUserData(response.data);
//     //   })
//     //   .catch((error) => {
//     //     // Handle errors here
//     //     console.error('Error fetching user data:', error);
//     //   });
    

//     async function fetchData(){
//       try {
//         let req = await fetch("http://127.0.0.1:5000/users/64b973cd582da16caa7072ea")
//          let data = await req.json()

//          setUser(data.user)
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     fetchData()
     
//   }, []);
//   function handleAddDetails(){
//     console.log("I want to add more details")
//   }
//   return (
//     <div>
//       {/* {userData ? (
//         <div>
//           <h2>User Profile</h2>
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//           {/* Display other user profile information */}
//         {/* </div>
//       ) : (
//         <div>Loading...</div>
//       )} */} 

// <div className="profile-container">
//      {user?( <div className="profile-header">
       
//        <h2>{user.name}</h2>
//      </div>):(
//       <h4>Loading....</h4>
//      )}
//       <div className="profile-details">
//         {user && user.age && user.location ? (
//           <div>
//             <p>Age: {user.age}</p>
//             <p>Location: {user.location}</p>
//             {/* Add more details */}
//           </div>
//         ) : (
//           <button onClick={handleAddDetails}>Add Details</button>
//         )}
//       </div>
//     </div>

//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import "../css/profile.css"
let user_id = localStorage.getItem("user_id")
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the fake API
      // let req = await fetch("http://127.0.0.1:5000/users/64b973cd582da16caa7072ea")
    fetch(`http://127.0.0.1:5000/users/${user_id}`)
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Implement the logic to save user data
    // For this example, we'll just update the user data in state
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAJ1BMVEXY4uP////z9vfe5uf7/Pzt8fLw9PTk6+z3+fnh6enb5eXo7u/V4eEGnPapAAACRElEQVRoge2ZAZKkIAxFRVBBvf95R8Z2tFrpJPhjb9XmXeAVhCQQmsYwDMMwjGcZfRqG5MfxafHQR/cixD495p1T697pn1n9EE7mTEyztnk8r/lv7crqVDTnyKvGffqkXpj01B2hdq5TCvpMqxe5jpva8Ne2a6z84zE7oHHgrtP6TMCrOcFegYfcs9XOebC7XM7OgAucZNnohfOjncFGPNLCAxGp5ub2BrKf8kraDrKnSE55pgW6uTVtA1jbxm+6hWoXcFdHWWXJ4KrL/+qWnzXgU+GL53yWlXNsQe+FbmQHH4TuAej2soAH6OXhi/1buOnILW9kWYa+oUtuD/DXKH/hAf4i41/ZFB5k3PqiMvrg7To2vzZYBQbZwY5wQq427qHvEOgn6IHxc23VifXGx3mP0pxnJ5WWHp+Y6E5X9gjuH0XSe53p9Ae5O7Of+hgysZ9886DZMB5lfh3uR8/4mIaua5cM+03tJcvabhqS/kdRmtpw3cbXRNfCp5a6PcQ+afiLPeSdFtxTfCd6G+Au6LOXjvaWxXvI8a8wZwA/pKP02b/T3bQXPl55hFv3ifpFr9S/UYTThsulV6a7dGh+TVW+yb5IylR8z6LUFXKcWixHqoUxl87yKASJLp9ZU/BTTTq6pWG/ULHBXmGGHL/jGd6u1/VMipaTaOIPKSachd/tXSU4PU1J7RytxnSvK+gCo3PSMvTn8P37QglyrK6T3CvUSUd3kSNUwDXq6QY1+9M7avRhM7e5zW1uc5vb3OY297/l/gG5Th5Ld2YxvgAAAABJRU5ErkJggg==" alt="User" className="profile-image" />
        {editing ? (
          <div>
            <label htmlFor='image'>Image:</label>
             <input
          type="text"
          name="image"
          value={user.image}
          onChange={handleInputChange}
        />
         <label htmlFor="Name">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
            </div>
         
        ) : (
          
          <h2>Name: {user.name}</h2>
        )}
      </div>
      <div className="profile-details">
        {editing ? (
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div>
            <p>Email: {user.email}</p>
            <p>Location: {user.location}</p>
          </div>
        )}
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

