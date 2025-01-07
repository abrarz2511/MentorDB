import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//AuthContextrovides a way to share authentication-related data (like the current user and functions to log in or out) across the component tree.
interface AuthContextType {
  user: string | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}     //Defines the type of an object of the type AuthContextType, must have a user, login and logout function as properties, user is a string or null, login resolves to a promise, logout has no return value 

const AuthContext = createContext<AuthContextType | undefined>(undefined);  //Creates an instance of the AuthContext type, with a default value of undefined

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {      //AuthProvider is a wrapper component that provides the authentication context to its child components. It is a funtion component that accepts children as props
  const [user, setUser] = useState<string | null>(null);  //user is initiated to null, setUser is a function that updates the user state
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {            //login function that takes username and password as arguments
    try {
      const response = await axios.post(
        'http://localhost:5000/auth', // makes a post request to the authentication endpoint of the backend server
        { user: username, pwd: password },
        { withCredentials: true } // Ensures cookies are sent with the request
      );
      const { Token } = response.data;    //An accesstoken is sent back from the server

      setAccessToken(Token);              //Update the accessToken state so that it can be stored in the state
      setUser(username);                  //Update the user state
      console.log('Access Token:', accessToken);

      // Navigate to a secure page after successful login
      navigate('/Components/Home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setUser(null);            //Clear the user state and access token
    setAccessToken(null);
    navigate('/login'); // Redirect to the login page on logout
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
