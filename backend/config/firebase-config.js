const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
// add this in git repo and also serviceAccount as soon as I will be making git public