import React from 'react';
import "../css/nav.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
     
    const [name, setName] = useState(localStorage.getItem('name'));
      
        // Function to handle the "Your Orders" button click
        const handleProfile = () => {
          if (name) {
            // Navigate to the Orders component using React Router's Link
            // return <Link to="/orders" />;
            // history.push("/orders")
            window.location.href="/profile"
          } else {
            alert('Please Login first');
          }
        }
    
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Your logo component here */}
        <span>ShowZilla</span>
      </div>
      <div className="navbar-links">
        {/* <button className="navbar-button">Login</button>
        <button className="navbar-button">Signup</button> */}
         {!name && <Link to="/login" className="login-btn">Login</Link>}
        {!name && <Link to="/signup" className="signup-btn">Signup</Link>}
        {/* {name && <button>{name}</button>} */}
        {name && (
          <button onClick={handleProfile}>
            {name}
          </button>
        )}
       
        <Link to="/movies"> <a className="navbar-link" href="#">Movies</a></Link>
        <Link to="/events"> <a className="navbar-link" href="#">Events</a></Link>
        <Link to="/offers"> <a className="navbar-link" href="#">Offers</a></Link>
        <Link to="/bookings"> <a className='navbar-link' href="#">Bookings</a></Link>
       
       
       
       
      </div>
    </nav>
  );
};

export default Navbar;
