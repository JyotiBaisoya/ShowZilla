
import './App.css';
import LoginForm from './component/login';
import Nav from './component/nav'
import SignupForm from './component/signup';
import HomePage from './component/homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './component/profile';
import Footer from './component/footer';
import MoviesPage from './component/moviespage';
import BookingPage from './component/bookingpage';
import EventPage from './component/eventpage';

function App() {
  return (
    <div className="App">
       
       <Router>
       <Nav/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      
        <Route path="/profile" element={<ProfilePage/>}/> 
    
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/events" element={<EventPage/>} />
        
       
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
