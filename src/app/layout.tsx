import type { Metadata } from 'next';
import './globals.css';
import Footer from './components/Footer/footer';
import NavBar from "./components/Navbar/Navbar";


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
        <NavBar/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
