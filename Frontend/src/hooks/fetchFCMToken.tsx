import { getToken } from "firebase/messaging";
import axios from "axios";
import messaging from "../firebase";

const fetchFCMtoken = () => {
  console.log("Requesting permission...");

  const accessToken = localStorage.getItem("accessToken");

  const customHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })
          .then(async (currentToken) => {
            console.log("FCM Token:", currentToken);
            if (currentToken) {
              try {
                const response = await axios.post(
                  import.meta.env.VITE_BASE_URL +
                    "/api/v1/notification/save/token",
                  {
                    fcmToken: currentToken,
                  },
                  { headers: customHeaders }
                );
                console.log("POST Request Response: ", response.data);
              } catch (error) {
                console.error("Error sending POST request:", error);
              }
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
