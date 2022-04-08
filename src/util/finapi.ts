import axios from "axios";

export const test = () => {
    var axios = require("axios").default;

    var options = { 
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote/6758.T',
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
            'x-api-key': '0d58NIu2j51S0oCpjeAMD2P2U4tSwl3m2Rf7W3CD'
        }
    };
    
    axios.request(options).then( (response: any) => {
        console.log(response.data);
    }).catch( (error: any) => {
        console.error(error);
    });
};