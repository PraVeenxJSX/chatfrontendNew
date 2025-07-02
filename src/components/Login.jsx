import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..'; // Make sure BASE_URL does NOT have a trailing slash

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const loginUrl = `${BASE_URL}/api/v1/user/login`;
      console.log("Login URL:", loginUrl); // Debugging aid

      const res = await axios.post(loginUrl, user, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      if (res && res.data) {
        dispatch(setAuthUser(res.data));
        navigate("/");
        toast.success('Login successful!');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        toast.error(error.response.data?.message || 'Login failed');
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('An error occurred during login');
      }
    }

    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className='w-full p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20'>
        <div className="text-center mb-8">
          <h1 className='text-4xl font-bold text-white mb-2'>Welcome Back</h1>
          <p className="text-gray-300">Please enter your details to sign in</p>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className='text-sm font-medium text-gray-300 block'>
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              type="text"
              placeholder='Enter your username'
              required
            />
          </div>
          <div className="space-y-2">
            <label className='text-sm font-medium text-gray-300 block'>
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
              <label className="ml-2 text-gray-300">Remember me</label>
            </div>
            <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
          </div>
          <button
            type="submit"
            className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]'
          >
            Sign In
          </button>
          <p className='text-center text-gray-300'>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;