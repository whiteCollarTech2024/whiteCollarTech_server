const admin = require("firebase-admin");
const serviceAccount = require("../firebase_service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "white-collar-tech.appspot.com",
});

module.exports = { bucket: admin.storage().bucket() };
