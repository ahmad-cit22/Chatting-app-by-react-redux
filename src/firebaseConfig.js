// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZ_Xi4amfGM-a7fkwWM0siXOgB3aDlFM",
  authDomain: "new-chatting-app-react-redux.firebaseapp.com",
  projectId: "new-chatting-app-react-redux",
  storageBucket: "new-chatting-app-react-redux.appspot.com",
  messagingSenderId: "564619421378",
  appId: "1:564619421378:web:34d3f913320d95e3057d5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
