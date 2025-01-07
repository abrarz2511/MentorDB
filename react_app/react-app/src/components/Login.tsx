import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.png'; // Ensure you have a logo image in the assets folder

const Login: React.FC = () => {
    const { login } = useAuth();                            //Access the login function from the AuthContext
    const [username, setUsername] = useState('');        //Initialized as an empty string, uses the set function to update state and returns the current value
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) => {          //when submitting the form this function is called which calls the login fnction from the auth context
        e.preventDefault();
        login(username, password);
    };
    //The Login component renders a form with input fields for username and password, and a button to submit the form.
    return (
        <div className = "flex items-center justify-center min h-screen bg-gray-50-py-12">
            <div className = "max-w-md w-full space-y-8">               //This div holds all the elements of the login form
                <img src = {logo} alt = "Logo" className='hidden md:blockmx-auto h-24'/>
                <form className = "mt-8 space-y-6" onSubmit = {handleFormSubmit}>       //When a submit button is clicked the handleFormSubmit function is called by the form
                    <div className = "space-y-6">       //This div holds the username and password input fields
                        <input 
                            type = "text"
                            name = "username"
                            value = {username}
                            onChange = {(e)=> setUsername(e.target.value)}
                            className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                        <input 
                            type = "password"
                            name = "password"
                            value = {password}
                            onChange = {(e)=> setPassword(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <div className = "flex items-center justify-between">    //This div holds the login and sign up buttons
                        <button type="submit">Login</button>

                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                            Sign Up
                        </button>

                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <Link to="/forgot-password" className="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </Link>
                </div>
            </div>
            

        </div>
    )
}

export default Login
