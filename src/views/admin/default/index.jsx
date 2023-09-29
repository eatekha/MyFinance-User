/*
Thhis file calls on thte transaction summary api and get the values necessary for dashboard
it then renders it onto the dashboard

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
import { useState, useEffect } from 'react';
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import PieCard from "views/admin/default/components/PieCard";
import extractUsername from 'components/functions/extractUsername';

import TotalSpent from "views/admin/default/components/TotalSpent";

export default function UserReports() {

  const username = extractUsername();
  const [expenses, setExpenses] = useState("0"); // Initialize as a string
  const [earnings, setEarnings] = useState(0);
  const [transactionTotal, setTransactionTotal] = useState("0");
  const [diff, setDiff] = useState("0");
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const [allTimeTransactions, setAllTimeTransactions] = useState("0"); // Initialize as a string



  async function fetchTransactionTotal(username) {
    const apiUrl = 'http://localhost:4000/totalProjects'; 
    const requestBody = JSON.stringify({ user_name: username });
  
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
      setAllTimeTransactions(data.transactions.count);
      return data.transactions.count; // Assuming the API response structure matches { transactions: transactionTotal }
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  }




  useEffect(() => {
    fetchTransactionTotal(username);
    fetchData(username);
  }, []);




  /// +/- box

  useEffect(() => {
    // Calculate the difference whenever earnings or expenses change
    const parsedDiff = parseFloat(earnings) + parseFloat(expenses);
    setDiff(isNaN(parsedDiff) ? 0: parsedDiff);
  }, [earnings, expenses]);


  const fetchData = async (username) => {
    try {
      const response = await fetch('http://localhost:4000/summaryTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_name: username, month: currentMonth })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      setExpenses(data.Expenses.total_negative_amount);
      const parsedEarnings = parseFloat(data.Earnings.total_positive_amount);
      setEarnings(isNaN(parsedEarnings) ? 0 : parsedEarnings);
      setTransactionTotal((data.TotalTransactions.count));
    } catch (error) {
      console.error('Error:', error);
      // Handle error state here if needed
    }
  };







  //Favourite Expense Box
  const [maxKey, setMaxKey] = useState("");
  
  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = 'http://localhost:4000/pieChart'; 
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_name: username })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();  
  
        const maxKey = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
        setMaxKey(maxKey)

        // Process the data and update the state variables
        //const categoriesArray = Object.keys(data); // Extract category names
        //const valuesArray = Object.values(data).map(value => value === null ? 0 : value) ; // Replace null with 0
  
        //setCategories(categoriesArray); // Update categories state
        //setCategoryValue(valuesArray); // Update categoryValue state
  
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    fetchUserData();
  }, [username]); // Add username as a dependency to useEffect
  
  
  
  



  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value= {'$' + earnings}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Expenses'
          value= {'$' + expenses/-1}
        />
        <MiniStatistics growth='+23%' name='+/-' value={'$' + diff} onChange={setDiff} />
        <MiniStatistics
          
          name='Favourite Expense'
          value={maxKey}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='Transactions This Month'
          value={transactionTotal}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Overall Transactions'
          value= {allTimeTransactions}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
      <PieCard />

        <TotalSpent />
        <MiniCalendar h='100%' minW='100%' selectRange={false} />

      </SimpleGrid>

    </Box>
  );
}
