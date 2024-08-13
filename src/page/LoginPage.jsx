import React, { useEffect, useState } from 'react'
import { users } from '../data/dataLogin';
import aksa from '../assets/aksamedia.svg';

export default function LoginPage() {
    const [usersData, setUsersData] = useState([]);

    useEffect(() =>{
        let storedUsers = localStorage.getItem("users");
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/";
        }
        if (!storedUsers) {
            localStorage.setItem("users", JSON.stringify(users));
            storedUsers = JSON.stringify(users);
        }

        setUsersData(JSON.parse(storedUsers));
    }, []);

    const generateToken = (username) => {
        const token = btoa(`${username}:${new Date().getTime()}`);
        return token;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");
        const user = usersData.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            localStorage.setItem("token", generateToken(username));
            window.location.href = "/";
        } else {
            alert("Username or Password is Wrongg!!");
            e.target.reset();
        }
    };

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm"> 
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In Your Account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="" method='POST' className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                        <input
                        id={"username"}
                        name="username"
                        type={"text"}
                        required
                        autoComplete="username"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                        <input
                        id={"password"}
                        name="password"
                        type={"password"}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div>
                        <button type='submit' className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
