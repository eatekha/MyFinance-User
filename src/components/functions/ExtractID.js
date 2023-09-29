export default function ExtractID() {
    const fullURL = window.location.href;
    const queryString = fullURL.split('?')[1]; // Split the URL by '?' and take the second part
    
    if (queryString) {
        // Split the query string into parameter-value pairs
        const paramsArray = queryString.split('&');
        const userIDParam = paramsArray.find(param => param.startsWith('user_id='));
        
        if (userIDParam) {
            const decodedValue = decodeURIComponent(userIDParam.split('=')[1]);
            console.log(decodedValue);
            sessionStorage.setItem('user_id', decodedValue);
            return decodedValue;
        } else {
            console.log("user_id parameter not found in the query string.");
            return "Demo";
        }
    } else {
        console.log("No query parameters found in the URL.");
        return "Demo";
    }
}
