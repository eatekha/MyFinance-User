import React, { useEffect, useState } from 'react';

export default async function ExtractUsername() {
  const user_id = sessionStorage.getItem('user_id');
  const apiUrl = 'https://my-finance-eseosa-62c6b070143e.herokuapp.com/getUsername';
  const requestBody = JSON.stringify({ user_id: user_id });

//only call if value changes

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
      console.error('Error getting username from api call getUsername', error);
    }
  }



  //only calls this function if there is userId
    if (user_id) {
      fetchData(); // Call the fetchData function without a return statement
    }
  }, []);


}

