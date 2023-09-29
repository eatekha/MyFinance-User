import React, { useEffect, useState } from 'react';

async function ExtractUsername() {
  const user_id = sessionStorage.getItem('user_id');
  const apiUrl = 'http://localhost:4000/getUsername';
  const requestBody = JSON.stringify({ user_id: user_id });

  // Define an async function to fetch data
  useEffect(() => {

  async function fetchData() {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.username;
    } catch (error) {
      console.error('Error:', error);
    }
  }

    if (user_id) {
      fetchData(); // Call the fetchData function without a return statement
    }
  }, [user_id]);


  // No return statement in this function
}

export default ExtractUsername;
