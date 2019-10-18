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
console.log(dateparam);
comCalculator.test();