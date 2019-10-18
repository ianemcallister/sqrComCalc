/*
*	SQUARE API
*
*	This is module handles all of our square API needs
*/

//  DECLARE DEPENDENCIES
let SquareConnect 	= require('square-connect');
let defaultClient 	= SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
let _oauth2 		= defaultClient.authentications['oauth2'];
_oauth2.accessToken = process.env.SQUARE_APP_TOKEN;

//	DEFINE THE MODULE
let squareAPI = {
    test: function() { console.log('good square test'); }
};

//	DEFINE LOCAL VARIABLES

//	NOTIFY PROGRESS

//  EXPORT THE MODULE
module.exports = squareAPI;