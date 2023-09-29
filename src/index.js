import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { GlobalStyle } from '@chakra-ui/react';
import ExtractID from 'components/functions/ExtractID';

ExtractID(); //runs before app is rendered
const sessionItem = sessionStorage.getItem('user_id'); //checks whether user logged in to display infromation
    
if (!sessionItem) {
  // Redirect to your desired link if it's empty
window.location.href = 'http://localhost:3000/';
}


const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
  };

const customTheme = extendTheme(theme, { config }); // Use the extendTheme function to modify the base theme


ReactDOM.render(
	
	<ChakraProvider theme={customTheme}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <GlobalStyle />
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Redirect from='/' to='/admin' />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
