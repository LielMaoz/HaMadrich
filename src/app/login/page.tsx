'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
//import { Html } from 'next/document';
//import { HtmlContext } from 'next/dist/shared/lib/html-context.shared-runtime';
import { GoogleLogin } from '@react-oauth/google';

/*const handleLogin = async (email: string, password: string) => {
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
  console.log("im here " + token);
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
};*/

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const Login = () => {
  const [valid, setValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Delay checking autofilled values to ensure the browser has populated them
    setTimeout(() => {
      if (emailRef.current && emailRef.current.value) {
        setEmail(emailRef.current.value);
      }
      if (passwordRef.current && passwordRef.current.value) {
        setPassword(passwordRef.current.value);
      }
    }, 100); // Small delay to allow autofill to populate
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log('email ' + email + ' pass ' + password);
    if (!email || !password) {
      setMessage('חובה למלא את כל השדות');
      setLoading(false);
      return;
    }
    if (email === 'NotValid') {
      setMessage('בדוק את הפרטי המייל שהזנת');
      setLoading(false);
      return;
    }
    try {
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
        window.location.href = '/'; // Navigate to the home page
      } else {
        //const { error } = await response.json();
        setMessage('אחד מהפרטים שהזנת איננו נכון אנא נסו שנית.');
      }
    } catch {
      setMessage('משהו השתבש. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">התחברות</h2>

        <div className="w-full px-4 py-2 flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              localStorage.setItem(
                'jwtToken',
                credentialResponse.credential as string
              ); // Store JWT token
              window.location.href = '/'; // Navigate to the home page
            }}
            onError={() => {
              setMessage('משהו השתבש. אנא נסה שוב.');
            }}
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              ref={emailRef}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="דואר אלקטרוני"
              onChange={(e) => setValid(validateEmail(e.target.value))}
              onBlur={(e) =>
                valid ? setEmail(e.target.value) : setEmail('NotValid')
              }
            />
            {!valid && (
              <p className="text-sm text-red-500 mt-1">
                בבקשה הזן כתובת דואר אלקטרוני תקנית
              </p>
            )}
          </div>
          <div className="relative flex items-center mb-4">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="סיסמה"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              src={
                showPassword ? '/icons/eye-open.png' : '/icons/eye-closed.png'
              }
              alt="Toggle Password Visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
            />
          </div>
          <div className="relative flex items-center">
            <button
              type="submit"
              className="relative flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-75"
            >
              {loading ? <LoadingSpinner /> : 'היכנס'}
            </button>
          </div>
          <div className="mb-4 text-sm text-red-500 mt-1">{message}</div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          אין לך חשבון?{' '}
          <a href="/signup" className="text-blue-500">
            הירשם
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
