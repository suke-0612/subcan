importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: 'AIzaSyBFZZGO8QyPViuE0VSX45MBz_JCoplmDW0',
    authDomain: 'subcan-474e5.firebaseapp.com',
    projectId: 'subcan-474e5',
    messagingSenderId: '708314237950',
    appId: '1:708314237950:web:65e646cff73a6822d7ceaf',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "./icon512_rounded.png",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});