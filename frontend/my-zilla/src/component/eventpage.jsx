import React, { useState, useEffect } from 'react';
import Event from './event';

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/events') 
      .then((response) => response.json())
      .then((data) => setEvents(data)
      
         )
      .catch((error) => console.error('Error fetching movie data:', error));

      console.log(events)
  },
 
   []);

  return (
    <div>
      <h1>BookShow</h1>
      {events.map((event) => (
        <Event key={event._id.$oid} eventData={event} />
      ))}
    </div>
  );
}

export default EventPage;
