/*
*	FIREBASE API
*
*	This is module handles all of our firebase API needs
*/

//   DECLARE DEPENDENCIES
let admin 			= require("firebase-admin");

//   DEFINE GLOBAL VARIABLES
let serviceAccount = {
	"type": 						process.env.FB_TYPE,
	"project_id": 					process.env.FB_PROJECT_ID,
	"private_key_id": 				process.env.FB_PRIVATE_KEY_ID,
	"private_key": 					process.env.FB_PRIVATE_KEY,
	"client_email": 				process.env.FB_CLIENT_EMAIL,
	"client_id": 					process.env.FB_CLIENT_ID,
	"auth_uri": 					process.env.FB_AUTH_URI,
	"token_uri": 					process.env.FB_TOKEN_URI
};

//   Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cnute-b75af.firebaseio.com"
});

//	DEFINE THE MODULE
let firebaseAPI = {
    test: function() { console.log('good firebase test'); }
};

//	DEFINE LOCAL VARIABLES

//	NOTIFY PROGRESS

//  EXPORT THE MODULE
module.exports = firebaseAPI;