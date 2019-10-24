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
	_buildTimeStamp: _buildTimeStamp,
	_listTransactions: _listTransactions,
	getDailyTransactions: getDailyTransactions,
    test: function() { console.log('good square test'); }
};

//	DEFINE LOCAL VARIABLES

//	NOTIFY PROGRESS

//	DEFINE PRIVATE FUNCTIONS
/*
*	PRIVATE: LIST TRANSACTIONS
*
*	This function wraps up the square listTransactions function so we can handle recursive calls to handle batch size
*
*	@param {string} square location Id
*	@param {string} beginTime in RFC 3339 format
*	@param {string} endTime in RFC 3339 format
*	@param {string} cursor is a pagination cursor returned by a previous call to this endpoint. Provide this to retrieve the next set of results for your original query.
*	@return {array} an array of transactions collected from square
*/
function _listTransactions(locationId, beginTime, endTime, cursor) {
	//	DECLARE LOCAL VARIABLES
	let transactionlist = [];
	let apiInstance = new SquareConnect.PaymentsApi();
	let opts = { 
		'beginTime': beginTime,
		'endTime': endTime,
		'cursor': cursor,
		'locationId': locationId
	};

	//	RETURN ASYNC WORK
	return new Promise(function sqListTransactionsPromise(resolve, reject) {
		
		//	CALL SQUARE CONNECT
		apiInstance.listPayments(opts)
		.then(function success(origTxsBatch) {
			
			//	CHECK FOR PAGINATION
			if(origTxsBatch.cursor != undefined) {
				
				//	IF A CURSOR WAS FOUND
				_listTransactions(locationId, beginTime, endTime, origTxsBatch.cursor)
				.then(function cursorSuccess(nextTxsBatch) {

					//	ITERATE OVER ORIGTXSBATCH
					for(let i = origTxsBatch.payments.length -1; i >= 0; i--) {
						nextTxsBatch.push(origTxsBatch.payments[i]);
					};

					//	PASS LIST BACK UP THE CHAIN
					resolve(nextTxsBatch);

				}).catch(function cursorError(e) {
					reject(e);
				});

			} else {

				//	IF NO CURSOR WAS FOUND

				//	ITERATE OVER ORIGTXSBATCH
				for(var i = origTxsBatch.payments.length -1; i >= 0; i--) {
					transactionlist.push(origTxsBatch.payments[i]);
				}; 

				//	PASS LIST BACK UP THE CHAIN
				resolve(transactionlist);
			}
		}).catch(function error(e) {
			reject(e);
		});

	});

};

/*
*	PRIVATE: BUILD TIME STAMP
*
*	This function wraps up the square listTransactions function so we can handle recursive calls to handle batch size
*
*	@param {string} date is a date in YYYY-MM-DD format
*	@param {string} side is a string listed as either 'beginTime' or 'endTime'
*	@return {string} a string formatted as YYYY-MM-DDTHH:MM:SS-07:00 (assuming transactions happen in the pacific time zone, otherwise change this to the proper GMT offest)
*/
function _buildTimeStamp(date, side) {
	//	DEFINE LOCAL VARIABLES
	let returnValue = "";

	//	IDENTIFY RETURN VALUE FORAMT
	if(side == "beginTime") {
		returnValue = date + 'T00:00:00-07:00';
	} else if(side == "endTime") {
		returnValue = date + 'T23:23:59-07:00';
	} else {
		throw "invalid side provided"
	}

	//	RETURN VALUE
	return returnValue;
};

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
	let locationId = 'M53KQT35YKE5C';
	let beginTime = _buildTimeStamp(date, 'beginTime');
	let endTime = _buildTimeStamp(date, 'endTime');
	let cursor = undefined;

	//	RETURN ASYNC WORK
	return new Promise(function getDailyTrainsactionsPromise(resolve, reject) {
		
		//	RUN LIST TRANSACTIONS FUNCTION
		_listTransactions(locationId, beginTime, endTime, cursor)
		.then(function txsSuccess(allTxs) {

			//	RESOLVE RESULTS
			resolve(allTxs);

		}).catch(function txsError(e) {
			reject(e);
		});

	});
};

//  EXPORT THE MODULE
module.exports = squareAPI;