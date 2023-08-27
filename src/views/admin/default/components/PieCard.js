// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import React, { useEffect, useState, useMemo } from "react";
import extractUsername from "components/functions/extractUsername";

export default function Conversion(props) {
//[expense data], [expenses]

const [categories, setCategories] = useState([]);
const [categoryValue, setCategoryValue] = useState([]);
const username = extractUsername();

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

      // Process the data and update the state variables
      const categoriesArray = Object.keys(data); // Extract category names
      const valuesArray = Object.values(data).map(value => value === null ? 0 : value) ; // Replace null with 0

      setCategories(categoriesArray); // Update categories state
      setCategoryValue(valuesArray); // Update categoryValue state

    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchUserData();
}, [username]); // Add username as a dependency to useEffect




const pieChartData = categoryValue;

const pieChartOptions = {
  labels: categories,
  colors: ["#4318FF", "#6AD2FF", "#EFF4FB", "#FF5733", "#FFC300", "#33FF57", "#D633FF", "#33EFFF", "#FF33B4"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
  colors: ["#4318FF", "#6AD2FF", "#EFF4FB", "#FF5733", "#FFC300", "#33FF57", "#D633FF", "#33EFFF", "#FF33B4"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};



//[1,1,1,1,1,1,1,1,1]





  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Breakdown
        </Text>
        <Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select>
      </Flex>
      {pieChartData.length > 0 && (
  <PieChart
    h='100%'
    w='100%'
    chartData= {pieChartData}
    chartOptions={pieChartOptions}
  />
)}
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Highest
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
          {categoryValue.length > 0 && (
  <div>
    {Math.max(...categoryValue) + '%'}
  </div>
)}          </Text>
        </Flex>
       
      </Card>
    </Card>
  );
}
