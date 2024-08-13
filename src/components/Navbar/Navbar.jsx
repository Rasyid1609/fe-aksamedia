import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Container from '../Container';
import DarkMode from '../DarkMode';

const Navbar = () => {
    const [navbarClick, setNavabrClick] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login"
        }
    }, [])

    const dataUser = atob(window.localStorage.getItem("token"));
    const username = dataUser.split(":")[0];
    const handleNavbarClick = () => {
        setNavabrClick(!navbarClick);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.location.href = "/login";
    }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Aksamedia</div>
        <div className="flex items-center">
            <DarkMode/>
            <div className="relative ml-4">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white">{username}</button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <Link to={"/profile/edit"} className="block px-4 py-2 text-gray-800 dark:text-gray-200">
                    Edit Profile
                </Link>
                <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 dark:text-gray-200">Logout</button>
                </div>
            )}
        </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar