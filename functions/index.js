

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.auth.user().onCreate((user) => {
  try {
    console.log("user created:", user);
    admin.firestore().collection("users").doc(user.uid).set({
      email: user.email,
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1],
      profilePicture: user.photoURL,
      hoursVolunteered: 0,
      userOpportunities: [],
      volunteeredOpportunities: [],
    });
  } catch (error) {
    console.log(error);
  }
});


exports.deleteUser = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});
