self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  
  const resultData = e.data.json();
  console.log("알림 정보: ", resultData.notification);
  console.log("알림 제목: ", resultData.notification.title);
  console.log("알림 내용: ", resultData.notification.body);
  // const notificationTitle = resultData.notification.title;

  // const notificationOptions = {
  //   body: resultData.notification.body,
    //     body: resultData.body,
    //     icon: resultData.image,
    //     tag: resultData.tag,
    //     ...resultData,
  // };

  // console.log("push: ", { resultData, notificationTitle, notificationOptions });
  //   console.log("push: ", { notificationTitle, notificationOptions });

  // self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
