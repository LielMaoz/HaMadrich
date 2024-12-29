'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, ChangeEvent, FormEvent } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Image from 'next/image';

const ResetPassword = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [jwt, setJwt] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<boolean>(true);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setMessage('הזן כתובת דואר אלקטרוני');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setJwt(data.jwt);
        setMessage('');
        setActiveTab('code');
      } else {
        setMessage('נא הזן את כתובת הדוא"ל איתה נרשמת');
      }
    } catch {
      setMessage('משהו השתבש. נסה שנית מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { code } = formData;

    if (!formData.code) {
      setMessage('אנא הזן את הקוד');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt,
          code,
        }),
      });

      if (response.ok) {
        setMessage('');
        setActiveTab('password');
      } else {
        setMessage('משהו השתבש. נסה להזין שוב את הקוד');
      }
    } catch {
      setMessage('משהו השתבש. נסה שנית מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'newPassword') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.newPassword);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.newPassword || !formData.confirmPassword) {
      setMessage('אנא בחר סיסמה ואמת אותה');
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

    const { newPassword } = formData;

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('הסיסמה עודכנה בהצלחה! מועבר לדף ההתחברות');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage('אירעה תקלה. נסה שוב מאוחר יותר');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">איפוס סיסמה</h2>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="flex justify-center mb-6">
            <TabsTrigger value="password" disabled={activeTab !== 'password'}>
              סיסמה חדשה
            </TabsTrigger>
            <TabsTrigger value="code" disabled={activeTab !== 'code'}>
              קוד אימות
            </TabsTrigger>
            <TabsTrigger value="email" disabled={activeTab !== 'email'}>
              דואר אלקטרוני
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <div className="text-1xl mb-6 text-center">
              הזן את כתובת הדואר האלקטרוני איתה נרשמת ואנו נשלח לך קוד אימות
              לשינוי הסיסמה בקלות ובמהירות
            </div>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-right"
                  placeholder="דואר אלקטרוני"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {loading ? <LoadingSpinner /> : 'שלח קוד אימות לדוא"ל'}
              </button>
            </form>
          </TabsContent>
          <TabsContent value="code">
            <div className="text-1xl mb-6 text-center">
              הזן את הקוד שקיבלת במייל. הקוד תקף ל- 5 דקות
            </div>
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-right"
                  placeholder="קוד אימות"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {loading ? <LoadingSpinner /> : 'בדוק קוד'}
              </button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <div className="text-1xl mb-6 text-center">
              הזן סיסמה חדשה כדי להשלים את התהליך
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <div className="relative flex items-center">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-right"
                    placeholder="סיסמה חדשה"
                  />
                  <Image
                    src={
                      isPasswordVisible
                        ? '/icons/eye-open.png'
                        : '/icons/eye-closed.png'
                    }
                    width={500}
                    height={500}
                    alt="Toggle Password Visibility"
                    onClick={handlePasswordToggle}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                  />
                </div>
                {!passwordStrength && (
                  <p className="text-sm text-red-500 mt-1">
                    הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה וקטנה באנגלית,
                    מספר ותו מיוחד (למשל: !, @, #)
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="relative flex items-center">
                  <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-right"
                    placeholder="אימות סיסמה חדשה"
                  />
                  <Image
                    src={
                      isConfirmPasswordVisible
                        ? '/icons/eye-open.png'
                        : '/icons/eye-closed.png'
                    }
                    width={500}
                    height={500}
                    alt="Toggle Confirm Password Visibility"
                    onClick={handleConfirmPasswordToggle}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                  />
                </div>
                {!passwordMatch && (
                  <p className="text-sm text-red-500 mt-1">
                    הסיסמאות אינן תואמות
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {loading ? <LoadingSpinner /> : 'החלף לסיסמה החדשה'}
              </button>
            </form>
          </TabsContent>
        </Tabs>

        {message && (
          <p
            className={`mt-4 text-center ${
              message === 'הסיסמה עודכנה בהצלחה! מועבר לדף ההתחברות'
                ? 'text-green-700'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
