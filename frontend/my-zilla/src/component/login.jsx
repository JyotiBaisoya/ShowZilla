import React, { useState } from 'react';
import '../css/login.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    namw: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  async function loginFunction(){
    try {
     let req = await fetch("http://127.0.0.1:5000/users/login",{
         method:"POST",
         headers:{
             "content-type":"application/json"
         },
         body:JSON.stringify(formData)
     })
     if(req.ok){
        const data = await req.json();
        console.log(data.user);
         localStorage.setItem("name",formData.name)
         localStorage.setItem("user_id",data.user._id)
        
         alert("logged in  successfully")
         window.location.href="/"
     }else{
         alert("something went wrong")
     }
    } catch (error) {
       alert(error)
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFunction()
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
