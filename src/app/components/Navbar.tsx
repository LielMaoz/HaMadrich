'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { decodeJWT } from '@/utils/jwtDecoder';
import { googleLogout } from '@react-oauth/google';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Search } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Function to check if a JWT token exists in localStorage
const checkToken = (): boolean => {
  return !!localStorage.getItem('jwtToken');
};

// Reusable component for navigation links
const NavigationLink = ({
  href,
  component: Component,
  text,
  additionalClasses,
}: {
  href: string;
  component: React.ElementType;
  text?: React.ReactNode;
  additionalClasses?: string;
}) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <Component
          className={`${navigationMenuTriggerStyle()} 
                        hover:font-bold text-white bg-gray-900 hover: transition-all 
                        ${additionalClasses}`}
        >
          {text}
        </Component>
      </Link>
    </NavigationMenuItem>
  );
};

const HomePage = () => {
  return (
    <NavigationLink
      href="/"
      component="a"
      additionalClasses="text-lg"
      text={<i className="fa-solid fa-house text-lg"></i>}
    />
  );
};

const SignIn = () => {
  return (
    <NavigationLink href="/login" component={NavigationMenuLink} text="כניסה" />
  );
};

const SignUp = () => {
  return (
    <NavigationLink
      href="/signup"
      component={NavigationMenuLink}
      text="הרשמה"
    />
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-reverse">
      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
        <Search className="text-white w-5 h-5" />
        <input
          type="text"
          placeholder="חיפוש.."
          dir="rtl"
          className="px-4 py-2 bg-gray-700 text-white rounded-full w-60 focus:outline-none"
        />
      </div>
    </div>
  );
};

// Dropdown menu for active user after successful login
const UserMenuDropDown = ({
  handleLogout,
  username,
}: {
  handleLogout: () => void;
  username: string;
}) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 bg-gray-800 text-white rounded-lg shadow-lg w-48 z-50 p-2 overflow-visible pointer-events-auto">
      <ul>
        {/*<li>
                        <Link href="/settings">
                            <a className="block px-4 py-2">Settings</a>
                        </Link>
                    </li>*/}
        <li className="px-4 py-2">
          <span className="text-sm text-white">{username}</span>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-right px-4 py-2 text-red-500
                        hover:text-white hover:bg-red-500 rounded-lg transition-all"
          >
            התנתקות
          </button>
        </li>
      </ul>
    </div>
  );
};

// Component for the user menu icon and dropdown
const UserMenu = ({
  userName,
  isMenuOpen,
  setIsMenuOpen,
  handleLogout,
}: {
  userName: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (state: boolean) => void;
  handleLogout: () => void;
}) => {
  return (
    <NavigationMenuItem>
      <div
        className="relative flex items-center justify-center group w-16 h-16 mx-auto"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <button className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
          {/* User icon */}
          <i className="fa-solid fa-user text-lg"></i>
        </button>
        <div
          className="w-full h-full absolute top-0 left-0"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          {isMenuOpen ? (
            <UserMenuDropDown handleLogout={handleLogout} username={userName} />
          ) : null}
        </div>
      </div>
    </NavigationMenuItem>
  );
};

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check for a token and update login state
  useEffect(() => {
    const tokenExists = checkToken();
    setIsLoggedIn(tokenExists);
    if (tokenExists) {
      // Decode the JWT and parse the username from it
      const decoded = decodeJWT();
      if (decoded) {
        let username = '';
        if (decoded.name) {
          username = decoded.name;
        }
        setUserName(username);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUserName('');
    setIsLoggedIn(false);
    // google log out
    googleLogout();
    window.location.href = '/';
  };

  return (
    <nav
      className="bg-gray-900 text-white w-full p-4 flex items-center"
      dir="rtl"
      style={{ position: 'sticky', top: 0, zIndex: 20 }}
    >
      <NavigationMenu>
        <NavigationMenuList
          className="flex justify-between items-center w-full"
          dir="rtl"
        >
          <div>
            <HomePage />
          </div>

          <div className="flex space-x-4 space-x-reverse">
            {!isLoggedIn ? (
              <>
                <SignIn />
                <SignUp />
              </>
            ) : (
              <UserMenu
                userName={userName}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleLogout={handleLogout}
              />
            )}
          </div>

          <div className="flex mr-auto">
            <SearchBar />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
