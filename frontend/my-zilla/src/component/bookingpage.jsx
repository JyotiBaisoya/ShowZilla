// import React, { useState, useEffect } from 'react';

// import '../css/bookingPage.css';

// let user_id = localStorage.getItem("user_id")

// const BookingPage = () => {
//   const [movieBookings, setMovieBookings] = useState([]);
//   const [eventBookings, setEventBookings] = useState([]);
//   const [movieData, setMovieData] = useState(null);
//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMovieBookings();
//     fetchEventBookings();
//   }, []);


//   async function fetchMovieBookings(){
//     try {
  
//   let req = await fetch(`http://127.0.0.1:5000/moviebookings?user_id=${user_id}`)
//   let data = await req.json()
//   let newdata =  data.filter((item)=>{
//         return item.user_id == user_id
//     })
//   setMovieBookings(newdata);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   async function fetchEventBookings(){
//       try {
  
//           let req = await fetch(`http://127.0.0.1:5000/eventbookings?user_id=${user_id}`)
//           let data = await req.json()
//           setEventBookings(data);
//             } catch (error) {
//               console.log(error)
//             }
      
//   }

// //   const fetchMovieData = (movie_id) => {
// //     setLoading(true);
// //     axios.get(`/movies/${movie_id}`)
// //       .then((response) => {
// //         setMovieData(response.data);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching movie data:', error);
// //         setLoading(false);
// //       });
// //   };

// // async function fetchMovieData(movie_id){
// //     setLoading(true)
// //     try {

// //         let req = await fetch(`http://127.0.0.1:5000/movies`)
// //         let data = await req.json()
// //      //   console.log(data)
// //         let newdata = data.filter((item)=>{
// //             return item._id.$oid === movie_id
// //         })
// //       //  console.log(newdata)
// //         setMovieData(newdata[0]);
// //         console.log(movieData)
// //         setLoading(false)
// //           } catch (error) {
// //             console.log(error)
// //             setLoading(false)
// //           }
    
// // }

// async function fetchMovieData(movie_id) {
//     setLoading(true);
//     try {
//       let req = await fetch(`http://127.0.0.1:5000/movies`);
//       let data = await req.json();
//       let newdata = data.find((item) => item._id.$oid === movie_id);
//       setMovieData(newdata);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }
  

// //   const fetchEventData = (event_id) => {
// //     setLoading(true);
// //     // Replace this with your API endpoint to fetch event data using event_id
// //     axios.get(`/api/events/${event_id}`)
// //       .then((response) => {
// //         setEventData(response.data);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching event data:', error);
// //         setLoading(false);
// //       });
// //   };


// async function fetchEventData(event_id){
//     setLoading(true)
//     try {

//         let req = await fetch(`http://127.0.0.1:5000/events/${event_id}`)
//         let data = await req.json()
//         setEventData(data);
//         setLoading(false)
//           } catch (error) {
//             console.log(error)
//             setLoading(false)
//           }
    
// }
   


//   const calculateTotalPrice = (num_tickets, price) => {
//     return num_tickets * price;
//   };

//   return (
//     <div className="booking-container">
//       <div className="movie-bookings">
//         <h2>Movie Bookings</h2>
//         {movieBookings.map((booking) => (
//           <div key={booking.id} className="booking-item">
//             <p>User ID: {booking.user_id}</p>
//             <p>Movie ID: {booking.movie_id}</p>
//             <button onClick={() => fetchMovieData(booking.movie_id)}>Fetch Movie Data</button>
//             {loading && <p>Loading movie data...</p>}
//             {movieData  && (
//               <>
//                 <img src={movieData.image} alt={movieData.name} className="movie-image" />
//                 <p>Price: Rs.{movieData.price}</p>
//                 <p>Number of Tickets: {booking.num_tickets}</p>
//                 <p>Total Price: Rs.{calculateTotalPrice(booking.num_tickets, movieData.price)}</p>
//               </>
//             )}
//             {!loading && !movieData && <p>Failed to fetch movie data.</p>}
//             {!loading && movieData && <p>Movie data not available.</p>}
//           </div>
//         ))}
//       </div>

//       <div className="event-bookings">
//         <h2>Event Bookings</h2>
//         {eventBookings.map((booking) => (
//           <div key={booking.id} className="booking-item">
//             <p>User ID: {booking.user_id}</p>
//             <p>Event ID: {booking.event_id}</p>
//             <button onClick={() => fetchEventData(booking.event_id)}>Fetch Event Data</button>
//             {loading && <p>Loading event data...</p>}
//             {eventData && booking.event_id === eventData._id && (
//               <>
//                 {/* Display event details here based on your event data */}
//                 <p>Event Name: {eventData.name}</p>
//                 <p>Event Date: {eventData.date}</p>
//                 <p>Event Location: {eventData.location}</p>
//                 <p>Price: Rs.{eventData.price}</p>
//                 <p>Number of Tickets: {booking.num_tickets}</p>
//                 <p>Total Price: Rs.{calculateTotalPrice(booking.num_tickets, eventData.price)}</p>
//               </>
//             )}
//             {!loading && !eventData && <p>Failed to fetch event data.</p>}
//             {!loading && eventData && booking.event_id !== eventData._id && <p>Event data not available.</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;


import React, { useState, useEffect } from 'react';
import '../css/bookingPage.css';

const BookingPage = () => {
  const [movieBookings, setMovieBookings] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState([]);
  const [loadingEvent, setLoadingEvent] = useState([]);

  let user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetchMovieBookings();
    fetchEventBookings();
  }, []);

  async function fetchMovieBookings() {
    try {
      let req = await fetch(`https://flaskagain.onrender.com/moviebookings?user_id=${user_id}`);
      let data = await req.json();
      let newdata =  data.filter((item)=>{
                return item.user_id == user_id
           })
          setMovieBookings(newdata);
   
      setMovieData(Array(data.length).fill(null)); // Initialize movieData state with null for each booking
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEventBookings() {
    try {
      let req = await fetch(`https://flaskagain.onrender.com/eventbookings?user_id=${user_id}`);
      let data = await req.json();
      setEventBookings(data);
      setEventData(Array(data.length).fill(null)); // Initialize eventData state with null for each booking
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMovieData(index, movie_id) {
    setLoadingMovie((prevLoading) => {
      const loadingArray = [...prevLoading];
      loadingArray[index] = true;
      return loadingArray;
    });

    try {
      let req = await fetch(`https://flaskagain.onrender.com/movies`);
      let data = await req.json();
      let newdata = data.find((item) => item._id.$oid === movie_id);

      setMovieData((prevData) => {
        const newDataArray = [...prevData];
        newDataArray[index] = newdata;
        return newDataArray;
      });

      setLoadingMovie((prevLoading) => {
        const loadingArray = [...prevLoading];
        loadingArray[index] = false;
        return loadingArray;
      });
    } catch (error) {
      console.log(error);

      setLoadingMovie((prevLoading) => {
        const loadingArray = [...prevLoading];
        loadingArray[index] = false;
        return loadingArray;
      });
    }
  }

  async function fetchEventData(index, event_id) {
    setLoadingEvent((prevLoading) => {
      const loadingArray = [...prevLoading];
      loadingArray[index] = true;
      return loadingArray;
    });

    try {
      let req = await fetch(`https://flaskagain.onrender.com/events/${event_id}`);
      let data = await req.json();

      setEventData((prevData) => {
        const newDataArray = [...prevData];
        newDataArray[index] = data;
        return newDataArray;
      });

      setLoadingEvent((prevLoading) => {
        const loadingArray = [...prevLoading];
        loadingArray[index] = false;
        return loadingArray;
      });
    } catch (error) {
      console.log(error);

      setLoadingEvent((prevLoading) => {
        const loadingArray = [...prevLoading];
        loadingArray[index] = false;
        return loadingArray;
      });
    }
  }

  const calculateTotalPrice = (num_tickets, price) => {
    return num_tickets * price;
  };

  return (
    <div className="booking-container">
      <div className="movie-bookings">
        <h2>Movie Bookings</h2>
        {movieBookings.map((booking, index) => (
          <div key={booking.id} className="booking-item">
            <p>Booking ID: {booking._id}</p>
            <p>Movie ID: {booking.movie_id}</p>
            <button onClick={() => fetchMovieData(index, booking.movie_id)}>More Booking Information</button>
            {loadingMovie[index] && <p>Loading movie data...</p>}
            {movieData[index] && (
              <>
                <img src={movieData[index].image} alt={movieData[index].name} className="movie-image" />
                <p>Price: Rs.{movieData[index].price}</p>
                <p>Number of Tickets: {booking.num_tickets}</p>
                <p>Total Price: Rs.{calculateTotalPrice(booking.num_tickets, movieData[index].price)}</p>
                <p>Payment:Pending</p>
                 <button>Payment</button>
              </>
            )}
            {/* {!loadingMovie[index] && !movieData[index] && <p>Failed to fetch movie data.</p>} */}
          </div>
        ))}
      </div>

      <div className="event-bookings">
        <h2>Event Bookings</h2>
        {eventBookings.map((booking, index) => (
          <div key={booking.id} className="booking-item">
            <p>User ID: {booking.user_id}</p>
            <p>Event ID: {booking.event_id}</p>
            <button onClick={() => fetchEventData(index, booking.event_id)}>More Booking Information</button>
            {loadingEvent[index] && <p>Loading event data...</p>}
            {eventData[index] && booking.event_id === eventData[index]._id && (
              <>
                {/* Display event details here based on your event data */}
                <p>Event Name: {eventData[index].name}</p>
                <p>Event Date: {eventData[index].date}</p>
                <p>Event Location: {eventData[index].location}</p>
                <p>Price: Rs.{eventData[index].price}</p>
                <p>Number of Tickets: {booking.num_tickets}</p>
                <p>Total Price: Rs.{calculateTotalPrice(booking.num_tickets, eventData[index].price)}</p>
              </>
            )}
            {!loadingEvent[index] && !eventData[index] && <p>Failed to fetch event data.</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;

