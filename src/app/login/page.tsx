'use client';
import React, { useState } from 'react';

const handleLogin = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('jwtToken', token); // Store JWT token
      console.log('Login successful');
    } else {
      const { error } = await response.json();
      console.log('Login failed:', error);
    }
  };
  
  const fetchProtectedData = async () => {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    console.log("im here "+token);
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Send token with API request
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('Protected data:', data);
    } else {
      console.error('Access denied');
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  
/*
'alice@example.com','PASSWORD123' ------- admin
"bob@example.com",'IMNOTADMIN123' ------- regular


const Login = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Login1</h1>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md" onClick={()=>handleLogin('alice@example.com','PASSWORD123')}>click me</button>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Login2</h1>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md" onClick={()=>handleLogin('bob@example.com','IMNOTADMIN123')}>click me</button>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Try take users</h1>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md" onClick={()=>fetchProtectedData()}>click me2</button>
        </div>
    );
}*/

const Login = () => {
  const[valid,setValid]=useState<boolean>(true);
  const[showPassword,setShowPassword]=useState<boolean>(false);
  const[email,setemail]=useState("");
  const[password,setPassword]=useState("");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">התחברות</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="דואר אלקטרוני"
            onChange={(e)=>setValid(validateEmail(e.target.value))}/>
            {!valid && <p className="text-sm text-red-500 mt-1">
              בבקשה הזן כתובת דואר אלקטרוני תקנית
              </p>}
          </div>
          <div className="relative flex items-center mb-4">
            <input
              type={showPassword?"text":"password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="סיסמה"
            />
            <img
            src={showPassword ? '/eye-open.png' : '/eye-closed.png'}
            alt="Toggle Password Visibility"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            התחבר
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          אין לך חשבון? <a href="/signup" className="text-blue-500">הירשם</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
