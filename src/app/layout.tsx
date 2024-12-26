import { Suspense } from "react";
import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './lib/UserContext';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="he" dir="rtl">
      <body>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
          <UserProvider>
            <NavBar />
            <Suspense fallback={<p>טוען...</p>}>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}