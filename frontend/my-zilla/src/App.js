
import './App.css';
import LoginForm from './component/login';
import Nav from './component/nav'
import SignupForm from './component/signup';
import HomePage from './component/homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './component/profile';

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
       
      </Routes>
    </Router>
    </div>
  );
}

export default App;
