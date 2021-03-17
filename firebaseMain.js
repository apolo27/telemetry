import { firebase } from '@firebase/app';
require('@firebase/database');
require('@firebase/analytics');

const firebaseConfig = {
    apiKey: "AIzaSyDj-B2q6BMV3GxrSQthf3t8XmEASWAG0s0",
    authDomain: "apolo-27-telemetry.firebaseapp.com",
    databaseURL: "https://apolo-27-telemetry-default-rtdb.firebaseio.com",
    projectId: "apolo-27-telemetry",
    storageBucket: "apolo-27-telemetry.appspot.com",
    messagingSenderId: "611072371353",
    appId: "1:611072371353:web:f0b965e5e1d56504f46608",
    measurementId: "G-Y7KBDQYBZM"
};

firebase.initializeApp(firebaseConfig); 
firebase.analytics();

var db = firebase.database().ref("Records/");

export {
    db
};