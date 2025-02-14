import { Suspense } from "react";
import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  title: 'המדריך',
  description: 'המדריך הינה אפליקציה אינטרנטית לאספקת מידע למשתמש קצה בנושא אימוני ירי. מטרת המערכת הינה לספק כלי עזר למדריך וללוחם בניהול אימוני הירי וקבלת תוכן מקצועי נגיש וזמין',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="he" dir="rtl">
      <body className="flex flex-col min-h-screen">
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
            <NavBar />
            <Suspense fallback={<p>טוען...</p>}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
