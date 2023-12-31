// Chakra Imports
import React from 'react';

import {
	Avatar,
	Flex,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import { FaEthereum } from 'react-icons/fa';
import routes from 'routes.js';

import { useState, useEffect } from 'react';


export default function HeaderLinks(props) {
	
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
		fetchData(); // Call the fetchData function without a return statement
	  }
	}, [requestBody, user_id]);

	  
	
	const handleLogoutClick = () => {
		sessionStorage.clear();
	  };
	const { secondary } = props;
	// Chakra Color Mode
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const ethColor = useColorModeValue('gray.700', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const ethBox = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" />
			<Flex
				bg={ethBg}
				display={secondary ? 'flex' : 'none'}
				borderRadius="30px"
				ms="auto"
				p="6px"
				align="center"
				me="6px">
				<Flex align="center" justify="center" bg={ethBox} h="29px" w="29px" borderRadius="30px" me="7px">
					<Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
				</Flex>
				<Text w="max-content" color={ethColor} fontSize="sm" fontWeight="700" me="6px">
					1,924
					<Text as="span" display={{ base: 'none', md: 'unset' }}>
						{' '}
						ETH
					</Text>
				</Text>
			</Flex>
			<SidebarResponsive routes={routes} />
			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name= {username}
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, {username}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
						<Link fontSize='sm' href='#/admin/profile'>Profile Settings</Link>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<Link  color='red' fontSize='sm' href='https://my-finance-landing-page-7367ccd5cd6d.herokuapp.com/' onClick={handleLogoutClick}>Log Out </Link> 
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
