import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";

export default function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
	const username = sessionStorage.getItem('user_name');


  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = () => {

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(formData);
  
      fetch("https://my-finance-eseosa-62c6b070143e.herokuapp.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle API response from the first POST call
          console.log("Upload API Response:", data);
          console.log("Username:", username);

          // Proceed to the second API POST call
          return fetch("https://my-finance-eseosa-62c6b070143e.herokuapp.com/insert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_name: username }), // Modify as needed
          });
        })
        .then((secondResponse) => secondResponse.json())
        .then((secondData) => {
          // Handle API response from the second POST call
          console.log("Second API Response:", secondData);
          console.log("Username:", username);


                  // Reload the page
        window.location.reload();
        })

        
        .catch((error) => {
          // Handle error for both API calls
          console.error("Error:", error);
        });
    }
  };
  

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  return (
    <Card {...props} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          onFileSelected={handleFileSelected}
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Files
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                Only CSV files are allowed
              </Text>
            </Box>
          }
        />
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Upload Bank Statement
          </Text>
          {!selectedFile && (
            <Text
              color={textColorSecondary}
              fontSize="md"
              my={{ base: "auto", "2xl": "10px" }}
              mx="auto"
              textAlign="start"
            >
              Effortlessly upload your bank statements for seamless financial tracking and analysis
              with our 'Upload Bank Statement' feature
            </Text>
          )}

          {selectedFile && selectedFile.name.toLowerCase().endsWith(".csv") && (
            <Flex direction="column">
              <Text
                as="u"
                color={textColorSecondary}
                fontSize="md"
                mb="50px"
                my={{ base: "auto", "2xl": "15px" }}
                textAlign="left"
              >
                {selectedFile.name}
              </Text>
              <Button colorScheme="blue" size="md" onClick={handleFileUpload}>
                Submit
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
