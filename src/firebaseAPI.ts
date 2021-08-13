import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const signIn = (onSignInSuccess: (userCredentials: any) => void) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(onSignInSuccess)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = async () => await firebase.auth().signOut();

export const loginStateListener = ({
  onUserIsSignIn,
  onUserNotSignedIn,
}: {
  onUserIsSignIn: (v: any) => void;
  onUserNotSignedIn: () => void;
}) =>
  firebase
    .auth()
    .onAuthStateChanged((user) =>
      user ? onUserIsSignIn(user) : onUserNotSignedIn()
    );

//store.commit("setUser", result.user);
