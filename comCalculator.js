/*
*	COMMISSION CALCULATOR
*
*	This is the commission calculator module
*/

//  DECLARE DEPENDENCIES
let square		= require('./squareAPI.js');
let firebase	= require('./firebaseAPI.js');

//	DEFINE THE MODULE
let commissionCalculator = {
	dailyCommissions: dailyCommissions, 
    test: function() { console.log('good comCalc test'); }
};

//	DEFINE LOCAL VARIABLES

//	NOTIFY PROGRESS

//  PUBLIC FUNCTIONS
/*
*	DAILY COMMISIONS
*
*	This function 
*	@param {string} date to be searched YYYY-MM-DD
*	@return {Object} collection of employees and their commissions
*/
function dailyCommissions(date) {
	//    DEFINE LOCAL VARIABLES
	let allDataPromises = [
		square.getDailyTransactions(date),
		firebase.getAllEmployees()
	];

	//    RETURN ASYNC WORK
	return new Promise(function dailyCommissionsPromise(resolve, reject) {

		//    WAIT FOR ALL PROMISES TO RESOLVE BEFORE PROCESSSING DATA
	    Promise.all(allDataPromises)
	    .then(function success(allDataArray) {
	    	resolve(allDataArray);
	    }).catch(function error(e) {
	    	reject(e);
	    });
    });
};

//  EXPORT THE MODULE
module.exports = commissionCalculator;