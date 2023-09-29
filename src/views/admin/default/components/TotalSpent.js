/**
 * This file edits the line chart to show expenses anad earnings for user
 */


import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import {  lineChartOptionsTotalSpent,
} from "variables/charts";
import { useState, useEffect, useMemo } from 'react';


export default function TotalSpent(props) {
  //Code
  const [expenseData, setExpenseData] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = 'http://localhost:4000/transactionsChart'; // Replace with your actual API URL

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: sessionStorage.getItem('user_id') }), // Modify as needed
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Process the data and update the state variables
        setExpenseData(data.map(entry => entry.expenses));
        setEarningsData(data.map(entry => entry.earnings));
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUserData();
  }, []);
  
  const lineChartDataTotalSpent = useMemo(() => [
    {
      name: "Earnings",
      data: earningsData

    },
    {
      name: "Expenses",
      data: expenseData
    }


    // ... other data
  ], [expenseData, earningsData]);










  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            This month
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            {'$' + expenseData[5]}
          </Text>
        <Flex align='center'>
          <Icon
            as={expenseData[4] !== 0 ? RiArrowUpSFill : RiArrowDownSFill}
            color={expenseData[4] !== 0 ? 'green.500' : 'red.500'}
            me='2px'
            mt='2px'
          />
          <Text
            color={expenseData[4] !== 0 ? 'green.500' : 'red.500'}
            fontSize='sm'
            fontWeight='700'
          >
            {expenseData[4] == 0
              ?`${expenseData[5]}%` 
              : `${(expenseData[5] / expenseData[4]).toFixed(2)}%`}
          </Text>
        </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
        {expenseData.length > 0 && earningsData.length > 0 && (
           <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />
)}
        </Box>
      </Flex>
    </Card>
  );
}
