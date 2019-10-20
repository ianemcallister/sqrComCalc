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
	getDailyTransactions: getDailyTransactions,
    test: function() { console.log('good square test'); }
};

//	DEFINE LOCAL VARIABLES

//	NOTIFY PROGRESS

//	DEFINE PUBLIC FUNCTIONS
/*
*	GET DAILY TRANSACTIONS
*
*	This function accepts a date in YYYY-MM-DD format and returns all the square transactions for all locations on that date.
*
*	@param {string} date in YYYY-MM-DD format
*	@return {object} collection of transactions returned from square 
*/
function getDailyTransactions(date) {
	//	DEFINE LOCAL VARIABLES
	//	RETURN ASYNC WORK
	return new Promise(function getDailyTrainsactionsPromise(resolve, reject) {
		resolve('good transactions test');
	});
};

//  EXPORT THE MODULE
module.exports = squareAPI;