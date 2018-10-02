import firebase from "firebase/app";
import "@firebase/firestore";

// Must start with REACT_APP https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const config = {
  apiKey,
  authDomain: "antropoloops-b9887.firebaseapp.com",
  databaseURL: "https://antropoloops-b9887.firebaseio.com",
  projectId: "antropoloops-b9887",
  storageBucket: "antropoloops-b9887.appspot.com",
  messagingSenderId: "87093748474"
};

console.log("firebase config", config);

firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
export const db = firestore;

// export const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
