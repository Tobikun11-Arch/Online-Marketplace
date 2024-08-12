"use client"
import './LogRegs.css'
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

interface ApiResponse {

    message: string;

}

export default function Page() {

  const [formData, setFormData] = useState({ Name: '', Email: '', Password: ''});
  const [message, setMessage] = useState('');
  const [messageLogin, setMessagelogin] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //user details to server post in server.ts to insert in database
    try {

        const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/users/register', { 
            //kukunin nya ung routes then dto isesend ung value ng formData because the method is POST 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },

            body: JSON.stringify(formData),
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = (await response.json()) as ApiResponse;
        // Parse the JSON response, kinuha nya na ung data sa response 
        setMessage(data.message); // Assuming your API returns a message
        setFormData({Name: '', Email: '', Password: ''});
       

    } 
    
    catch (error) {

        console.error('There was a problem with the fetch operation:', error);

        setMessage('An error occurred while registering.'); // Set an error message

    }

  };




  //Login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); //user details to server post in server.ts to insert in database
    try {
      const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email: email, Password: password }), // Ensure email and password are set correctly
      });
      
      if (response.ok) {

        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');

    }
    
    else {

        const errorData = await response.json();
        console.error("Error login:", errorData);
        setMessagelogin(errorData.error || 'Login failed');
        
    }

    } 
    
    catch (error) {

      console.error('Error logging in:', error);

    }

  };


  return (
    <>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>


                <form className="flip-card__form" action="" onSubmit={handleLogin}>
                  <input className="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                  <input className="flip-card__input" name="password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                  <button className="flip-card__btn">Let&apos;s go!</button>
                  {messageLogin && <p>{messageLogin}</p>}
                </form>

              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>


                <form className="flip-card__form" action="" onSubmit={handleSubmit}>

                  <input className="flip-card__input" placeholder="Name" onChange={handleChange} value={formData.Name}
                  type="text"
                  id="Name"
                  name="Name"
                  />
                  
                  <input className="flip-card__input" id="Email" name="Email" placeholder="Email" type="email"  onChange={handleChange} value={formData.Email}/>

                  <input className="flip-card__input" name="Password" placeholder="Password" type="password"  onChange={handleChange} value={formData.Password}/>


                  <button className="flip-card__btn">Confirm!</button>
                  {message && <p>{message}</p>}
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  )
}
