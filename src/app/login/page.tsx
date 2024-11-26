'use client';


import Link from "next/link";


const handleLogin = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
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
  
/*
'alice@example.com','PASSWORD123' ------- admin
"bob@example.com",'IMNOTADMIN123' ------- regular
*/

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
}

export default Login;