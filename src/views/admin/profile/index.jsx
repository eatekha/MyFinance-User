import { Box, Grid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Custom components
import Banner from "views/admin/profile/components/Banner";

// Assets
import banner from "assets/img/auth/banner.png";

export default function Overview() {

  const user_id = sessionStorage.getItem('user_id');
	const apiUrl = 'https://my-finance-eseosa-62c6b070143e.herokuapp.com/getUsername';
	const requestBody = JSON.stringify({ user_id: user_id });
	const [username, setUsername] = useState(null);

  
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
		setUsername(data.username);
	  } catch (error) {
		console.error('Error:', error);
	  }
	}
  
	  if (user_id) {
		fetchData(); 
	  }
	});








  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
          
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={username}
          name= {username}
          job='Best User'
        />
      </Grid>
    </Box>
  );
}
