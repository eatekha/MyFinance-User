'use client'

export const metadata = {
  title: 'Sign In',
  description: 'Page description',
}
import Link from 'next/link'
import React from 'react';

import { useNavigate } from 'react-router-dom'; // Import useHistory






export default function SignIn() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make API call to verify credentials
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: username, user_password: password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        console.log('Login successful:', data);
      // Construct the URL with the 'username' variable using backticks
      const url = `http://localhost:3001/horizon-ui-chakra#/admin/default?user_name=${username}`;

      // Redirect to the constructed URL
      window.location.href = url;        // Change '/specific-link' to your desired link


      } else {
        // Error handling for unsuccessful login
        console.log('Login failed');
        console.log(username);
        console.log(password);
      }
    } catch (error) {
      console.log('API error:', error);
    }
  };
























  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome! Join MyFinance Today</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                    <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-400">Or, sign in with your username</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>



            <form onSubmit={handleSubmit} >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">Username</label>



                  <input id="username" type="username" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" value = {username}   onChange={(e) => setUsername(e.target.value)} required />


                  
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)"  value = {password}   onChange={(e) => setPassword(e.target.value)}required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Keep me signed in</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button id= "submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                </div>
              </div>
            </form>











            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
