import React from 'react';
import '../css/movie.css';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Event = ({ eventData }) => {
  const [selectedTiming, setSelectedTiming] = useState('');
  const [eventid,setEventId] = useState("");
  const handleBookNowClick = (eventId) => {
      setEventId(eventId)
    localStorage.setItem('selectedEventId', eventId);
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
        console.log("movie",eventid)
        bookShow(numTickets,selectedTiming,eventId)
        // You can perform any further action with the number of tickets here
      }
    })
  };


  async function bookShow(numTickets,selectedTiming,eventId){
         let user_id = localStorage.getItem("user_id")
          let obj ={"timing":selectedTiming,"num_tickets":numTickets,"user_id":user_id}
           try {
            let req = await fetch(`https://flaskagain.onrender.com/events/${eventId}/book`,{
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
        <img src={eventData.image} alt={eventData.name} className="movie-image" />
        <div className="movie-info">
          <h2>{eventData.title}</h2>
          <p>{eventData.description}</p>
          <button className='Book'>Book Event</button>
          {/* <p>Duration: {eventData.duration}</p> */}
          {/* <p>Price: Rs.{eventData.price}</p> */}
        </div>
      </div>
     

{/* <div className="shows">
        <h3>Shows</h3>
        {eventData.shows.map((show, index) => (
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
            <button className='book'   onClick={() => handleBookNowClick(eventData._id.$oid)}>Book Now</button>
          </div>
        ))} */}
      {/* </div> */}
    </div>
  );
};

export default Event;
