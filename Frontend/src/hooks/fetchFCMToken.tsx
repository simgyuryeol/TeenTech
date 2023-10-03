import { getToken } from "firebase/messaging";
import messaging from "../firebase";
// import { transmitFCMtoken } from '../../api/transmitFCMtoken';

const fetchFCMtoken = () => {
  console.log("Requesting permission...");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })
          .then(async (currentToken) => {
            if (currentToken) {
              console.log("FCM Token : ", currentToken);

              // const res = await transmitFCMtoken(currentToken)
            } else {
              console.log("FCM Token Unavailable");
            }
          })
          .catch((err) => {
            console.log("error fetching token", err);
          });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export default fetchFCMtoken;
