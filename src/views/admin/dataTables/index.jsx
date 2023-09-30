
import { Box, Grid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import React, { useState, useEffect } from "react";
import Upload from "../profile/components/Upload";


const columnsDataDevelopment = [
  {
    Header: "TRANSACTION",
    accessor: "transaction",
  },
  {
    Header: "KEYWORD",
    accessor: "keyword",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
  },

  {
    Header: "CATEGORY",
    accessor: "category",
  }
];

export default function Settings() {
  
  const user_id = sessionStorage.getItem('user_id');
  const [tableDataDevelopment, setTableDataDevelopment] = useState([]);


  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = 'https://my-finance-eseosa-62c6b070143e.herokuapp.com/transactionTable';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user_id })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Update the state with the fetched data
        setTableDataDevelopment(data);
        return data;

      } catch (error) {
        console.log(error);
        console.error("Error:", error);

      }
    }

    fetchUserData();
  }, []);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <Grid templateColumns="60% 40%" gap="20px">

        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
       <Upload/>
      </Grid>
    </Box>
  );
}
