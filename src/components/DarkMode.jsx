import React, { useEffect, useState } from 'react'

const DarkMode = () => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || (userPrefersDark ? 'dark' : 'light'));

    useEffect(() => {
        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toogleDarkMode = () => {
        setDarkMode(darkMode === 'dark' ? 'light' : 'dark');
    };

  return (
    <button onClick={toogleDarkMode} className='p-2 bg-gray-300 dark:bg-gray-600 rounded-md'>
        {darkMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkMode;