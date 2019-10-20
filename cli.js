/*
*	CLI
*
*	This is the command line interface script
*/

//  DECLARE DEPENDENCIES
let comCalculator 	= require('./comCalculator.js');

//	DEFINE LOCAL VARIABLES
let dateparam = process.argv[2]

//	NOTIFY PROGRESS

//	RUN
if(dateparam != undefined) {

	//	RUN ASYNC WORK - only if a valid dateparam is present
	comCalculator.dailyCommissions(dateparam)
	.then(function success(commissionsReport) {

		//	NOTIFY RESULTS
		console.log(commissionsReport);

	}).catch(function error(e) {
	    console.error('There was an error:', e);
	});
	
} else {
	//	NOTIFY ERROR - if no valid dateparam is present
	console.error('INVALID DATA PARAMETER, PLEASE ENTER VALID DATE PARAMETER "YYYY-MM-DD"')
}

