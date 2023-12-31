/*
Thhis file calls on thte transaction summary api and get the values necessary for dashboard
it then renders it onto the dashboard

*/
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
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
import TotalSpent from "views/admin/default/components/TotalSpent";

export default function UserReports() {

  
  const user_id = sessionStorage.getItem('user_id');
  const [expenses, setExpenses] = useState("0"); // Initialize as a string
  const [earnings, setEarnings] = useState(0);
  const [transactionTotal, setTransactionTotal] = useState("0");
  const [diff, setDiff] = useState("0");
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const [allTimeTransactions, setAllTimeTransactions] = useState("0"); // Initialize as a string




  async function fetchTransactionTotal(user_id) {
    const apiUrl = 'https://my-finance-eseosa-62c6b070143e.herokuapp.com/totalProjects'; 
    const requestBody = JSON.stringify({ user_id: user_id });

  
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
    if (user_id) {

  const fetchData = async () => {
    try {
      const response = await fetch('https://my-finance-eseosa-62c6b070143e.herokuapp.com/summaryTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user_id, month: currentMonth}), // Modify as needed
      

      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setExpenses(data.Expenses.total_negative_amount);
      console.log(data.Earnings.total_positive_amount);
      const parsedEarnings = parseFloat(data.Earnings.total_positive_amount);
      setEarnings(isNaN(parsedEarnings) ? 0 : parsedEarnings);
      setTransactionTotal((data.TotalTransactions.count));
    } catch (error) {
      console.error('Error:', error);
      // Handle error state here if needed
    }
  };




    fetchTransactionTotal(user_id);
    fetchData();
    }
  }, [user_id, currentMonth]);






  /// +/- box

  useEffect(() => {
    // Calculate the difference whenever earnings or expenses change
    const parsedDiff = parseFloat(earnings) + parseFloat(expenses);
    setDiff(isNaN(parsedDiff) ? 0: Math.round(parsedDiff*100)/100);
  }, [earnings, expenses]);




  //Favourite Expense Box
  const [maxKey, setMaxKey] = useState("");
  
  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = 'https://my-finance-eseosa-62c6b070143e.herokuapp.com/pieChart'; 
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user_id}), // Modify as needed
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();  
  
        const maxKey = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
        setMaxKey(maxKey)

      
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    if (user_id) {

    fetchUserData();
    }
  }, [user_id]); // Add username as a dependency to useEffect
  

  
  
  



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
