import React from "react";

// Chakra imports
import { Flex, Link, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import { TestLogo } from "components/icons/Icons";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Link href='https://my-finance-dashboard-29227dab4c63.herokuapp.com/#/admin/dashboard'>
      <TestLogo h='80px' w='100px' my='32px' color={logoColor} />
      </Link>

      <HSeparator />
    </Flex>
  );
}

export default SidebarBrand;
