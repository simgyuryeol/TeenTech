import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMBkyNdUJZoQQye38NFFUl-ZuDA_F4UDU",
  authDomain: "teentech-a4f5f.firebaseapp.com",
  projectId: "teentech-a4f5f",
  storageBucket: "teentech-a4f5f.appspot.com",
  messagingSenderId: "75711719664",
  appId: "1:75711719664:web:c75a6f5ead9b2c7ee33a35",
};

const firebase = initializeApp(firebaseConfig);

const messaging = getMessaging(firebase);

export default messaging;
