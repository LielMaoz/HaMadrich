'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { User } from '../lib/types';
import LoadingSpinner from '../components/LoadingSpinner';
import { GoogleButton } from '../components/GoogleButton';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (name === 'email') {
      setEmailValid(validateEmail(value));
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordMatch(value === formData.password);
    }
  };

  const checkPasswordStrength = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+,.]/.test(password)
    );
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setMessage('חובה למלא את כל השדות');
      setLoading(false);
      return;
    }

    if (!passwordMatch) {
      setMessage('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    if (!passwordStrength) {
      setMessage('אנא הזן סיסמה שעומדת בדרישות');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('jwtToken', token);
        window.location.href = '/'; // Navigate to the home page
      } else {
        const errorData = await res.json();
        setMessage(errorData?.error || 'ההרשמה נכשלה. אנא נסה שוב.');
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
        <h2 className="text-2xl font-bold mb-6 text-center">הרשמה</h2>

        <GoogleButton onFail={() => setMessage('ההתחברות עם גוגל לא הצליחה')} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="שם פרטי"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="שם משפחה"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="דואר אלקטרוני"
            />
            {!emailValid && (
              <p className="text-sm text-red-500 mt-1">
                בבקשה הזן כתובת דואר אלקטרוני תקנית
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="סיסמה"
              />
              <img
                src={
                  isPasswordVisible
                    ? '/icons/eye-open.png'
                    : '/icons/eye-closed.png'
                }
                alt="Toggle Password Visibility"
                onClick={handlePasswordToggle}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
              />
            </div>
            {!passwordStrength && (
              <p className="text-sm text-red-500 mt-1">
                הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה וקטנה באנגלית, מספר
                ותו מיוחד (למשל: !, @, #).
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="אימות סיסמה"
              />
              <img
                src={
                  isConfirmPasswordVisible
                    ? '/icons/eye-open.png'
                    : '/icons/eye-closed.png'
                }
                alt="Toggle Confirm Password Visibility"
                onClick={handleConfirmPasswordToggle}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
              />
            </div>
            {!passwordMatch && (
              <p className="text-sm text-red-500 mt-1">הסיסמאות אינן תואמות</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative flex items-center justify-center w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            {loading ? <LoadingSpinner /> : 'צור חשבון'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center text-gray-600">
          כבר יש לך חשבון?{' '}
          <a href="/login" className="text-blue-500">
            התחבר
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
