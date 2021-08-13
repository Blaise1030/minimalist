import firebase from "firebase";
import {Task} from "./models";
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

const TASK_COLLECTION = "collection";

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
export const logout = () => firebase.auth().signOut();
export const getAllUserTasks = ({
  userId,
  listId,
  onSnapShot,
}: {
  userId: string;
  listId: string;
  onSnapShot: (data: any[]) => void;
}) => {
  firebase
    .firestore()
    .collection(TASK_COLLECTION)
    .where("userId", "==", userId)
    .where("listId", "==", listId)
    .onSnapshot((docSnap) => onSnapShot(docSnap.docs));
};

export const addUserTask = ({userTask}: {userTask: Task}) => {
  firebase
    .firestore()
    .collection(TASK_COLLECTION)
    .doc(`${userTask.id}${userTask.userId}`)
    .set(userTask);
};

export const userTaskCheckOrUncheck = ({
  taskId,
  userId,
  isDone = false,
}: {
  taskId: string;
  userId: string;
  isDone: boolean;
}) => {
  firebase
    .firestore()
    .collection(TASK_COLLECTION)
    .doc(`${taskId}${userId}`)
    .update({
      isDone,
    });
};

export const userTaskDelete = ({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) => {
  firebase
    .firestore()
    .collection(TASK_COLLECTION)
    .doc(`${taskId}${userId}`)
    .update({
      isDeleted: true,
    });
};
