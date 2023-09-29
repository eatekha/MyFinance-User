import React from "react";

export default function extractUsername() {
    const fullURL = window.location.href;
    const queryString = fullURL.split('?')[1]; // Split the URL by '?' and take the second part
    
    if (queryString) {
        // Split the query string into parameter-value pairs
        const paramsArray = queryString.split('&');
        
        // Use the find method to look for the user_name parameter
        const userNameParam = paramsArray.find(param => param.startsWith('user_name='));
        
        if (userNameParam) {
            const decodedValue = decodeURIComponent(userNameParam.split('=')[1]);
            return decodedValue;
        } else {
            console.log("user_name parameter not found in the query string.");
            return "Demo";
        }
    } else {
        console.log("No query parameters found in the URL.");
        return "Demo";
    }
}
