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

var db = firebase.database().ref("records/");

// collection references
/*
record = {
  date : datetime,
  enviroment : {
    UV : float,
    humidity : float,
    pressure : float,
    temperature : float
  },
  pilot : {
    bracelet battery : float
    heart rate : float,
    oxigene level: float,
    temperature: float
  },
  rover : {
    GPS : [
      0 : float,
      1 : float,
      2 : float
    ],
    RPM : float,
    rover battery : float
  }
}
*/
//const records = db.collection('')

// export utils/refs
export {
  db
};