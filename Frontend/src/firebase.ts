import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_SENDER_ID,
	VITE_FIREBASE_APP_ID,
} = import.meta.env

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VITE_FIREBASE_SENDER_ID,
	appId: VITE_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);

const messaging = getMessaging(firebase);

export default messaging;
