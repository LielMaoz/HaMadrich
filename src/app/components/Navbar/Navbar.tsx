'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Search } from "lucide-react";

const checkToken = () : boolean => {
    const token = localStorage.getItem("jwtToken");
    return !!token;
};

const SignIn = () => {
    return(
        <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className=
                {`${navigationMenuTriggerStyle()} 
                ${"hover:font-bold hover: transition-all"}`}
                >
                כניסה
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
};

const SignUp = () => {
    return(
        <NavigationMenuItem>
            <Link href="/sign-up" legacyBehavior passHref>
            <NavigationMenuLink className=
                {`${navigationMenuTriggerStyle()} 
                ${"hover:font-bold hover: transition-all"}`}
                >
                הרשמה
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
};

const SearchBar = () => {
    return(
        <div className="flex items-center space-x-reverse">
            <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                <Search className="text-white w-5 h-5" />
                <input
                type = "text"
                placeholder="חיפוש.."
                dir="rtl"
                className="px-4 py-2 bg-gray-700 text-white rounded-full w-60 focus:outline-none"
                />
            </div>
        </div>
    );
};

const UserMenuDropDown = ({ handleLogout }: { handleLogout: () => void }) => {
    return (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-48">
            <ul>
                {/*<li>
                    <Link href="/settings">
                        <a className="block px-4 py-2">Settings</a>
                    </Link>
                </li>*/}
                <li>
                    <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500
                    hover:text-white hover:bg-red-500 rounded-lg transition-all"
                    >
                    התנתקות
                    </button>
                </li>
            </ul>
        </div>
      );
};

const UserMenu = (
    {userName, isMenuOpen, toggleMenu, handleLogout} :
    {userName: string,
    isMenuOpen: boolean,
    toggleMenu: () => void,
    handleLogout: () => void;}
    ) => {
    return(
        <NavigationMenuItem>
            <div className="relative">
                <NavigationMenuLink
                className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={toggleMenu}>
                {userName}
                </NavigationMenuLink>
                {isMenuOpen ? (
                    <UserMenuDropDown handleLogout = {handleLogout}/>
                    ) : null}
            </div>
        </NavigationMenuItem>
    );
};

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("user name");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect (() => {
        const tokenExists = checkToken();
        setIsLoggedIn(tokenExists);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    };

    const handleItemClick = (item : string) => {
        setSelectedItem(item);
    };

    return (
        <nav className="bg-gray-900 text-white w-full p-4" dir="rtl">
            <NavigationMenu>
                <NavigationMenuList className="flex justify-between items-center w-full">
                    <div className="flex ml-auto">
                        <SearchBar />
                    </div>
                    <div className="flex space-x-4 space-x-reverse">
                        {!isLoggedIn ? (
                        <>
                            <SignUp />
                            <SignIn />
                        </>
                        ) : (
                            <UserMenu
                            userName={userName}
                            isMenuOpen = {isMenuOpen}
                            toggleMenu = {toggleMenu}
                            handleLogout = {handleLogout}
                            />
                            )}
                        </div>
  
            </NavigationMenuList>
        </NavigationMenu>
        </nav>
    );
};

export default NavBar;