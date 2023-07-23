import React from 'react';
import '../css/movie.css';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Movie = ({ movieData }) => {
  const [selectedTiming, setSelectedTiming] = useState('');
  const [movieid,setMovieId] = useState("");
  const handleBookNowClick = (movieId) => {
      setMovieId(movieId)
    localStorage.setItem('selectedMovieId', movieId);
    Swal.fire({
      title: 'Enter the number of tickets',
      input: 'number',
      inputAttributes: {
        min: 1,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: 'Book',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const numTickets = result.value;
        console.log('Number of tickets:', numTickets);
      
        console.log('Timing:', selectedTiming);
        console.log("movie",movieid)
        bookShow(numTickets,selectedTiming,movieId)
        // You can perform any further action with the number of tickets here
      }
    })
  };


  async function bookShow(numTickets,selectedTiming,movieId){
         let user_id = localStorage.getItem("user_id")
          let obj ={"timing":selectedTiming,"num_tickets":numTickets,"user_id":user_id}
           try {
            let req = await fetch(`http://127.0.0.1:5000/movies/${movieId}/book`,{
              method:"POST",
              headers:{
                "content-type":"application/json"
              },
              body:JSON.stringify(obj)

            })

            if(req.ok){
              Swal.fire("Movie Booked Successfully you can see in your bookings")
            }
           } catch (error) {
              console.log(error)

           }
  }


  return (
    <div className="movie-container">
      <div className="movie-details">
        <img src={movieData.image} alt={movieData.name} className="movie-image" />
        <div className="movie-info">
          <h2>{movieData.name}</h2>
          <p>{movieData.description}</p>
          <p>Duration: {movieData.duration}</p>
          <p>Price: Rs.{movieData.price}</p>
        </div>
      </div>
     

<div className="shows">
        <h3>Shows</h3>
        {movieData.shows.map((show, index) => (
          <div key={index} className="show">
            <p>Select A Timing:</p>
            <select className='select'  value={selectedTiming}
              onChange={(e) => setSelectedTiming(e.target.value)}
            >
              {show.timing.map((timing, idx) => (
                <option key={idx} value={timing}>
                  {timing}
                </option>
              ))}
            </select>
            <button className='book'   onClick={() => handleBookNowClick(movieData._id.$oid)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
