import React, { useState } from 'react';
import '../css/signup.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
   
  };

   async function registerFunction(){
       try {
        let req = await fetch("http://127.0.0.1:5000/users/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        if(req.ok){
            alert("registerd successfully")
            window.location.href="/login"
        }else{
            alert("something went wrong")
        }
       } catch (error) {
          alert(error)
       }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerFunction()
    // Perform form submission logic here, e.g., sending data to the backend API
    console.log('Form submitted:', formData);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
