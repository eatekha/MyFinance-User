/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid, Grid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import extractUsername from "components/functions/extractUsername";

import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
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
  

  const [tableDataDevelopment, setTableDataDevelopment] = useState([]);
  const username = extractUsername();


  useEffect(() => {
    async function fetchUserData() {
      const apiUrl = 'http://localhost:4000/transactionTable';

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
        // Update the state with the fetched data
        setTableDataDevelopment(data);
        return data;

      } catch (error) {
        console.log(error);
        console.error("Error:", error);

      }
    }

    fetchUserData();
  }, [username]);

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
