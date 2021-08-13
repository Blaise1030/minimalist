import {
  getAllUserTasks,
  loginStateListener,
  logout,
  signIn,
  userTaskCheckOrUncheck,
} from "@/firebaseAPI";
import router from "@/router";
import {createStore} from "vuex";

export default createStore({
  state: {
    user: null,
    todos: [],
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
    setTasks(state, taskSnapshotList) {
      state.todos = taskSnapshotList;
    },
  },
  getters: {
    getUser: (state) => () => state.user,
  },
  actions: {
    userTaskCheckOrUncheck: ({state}, {isCheck, taskId}) => {
      userTaskCheckOrUncheck({
        taskId,
        userId: (state?.user || {uid: ""}).uid,
        isDone: isCheck,
      });
    },
    // Gets all the user to do tasks
    userToDoListeners: ({commit, state}) => {
      getAllUserTasks({
        userId: (state?.user || {uid: ""}).uid,
        listId: "0",
        onSnapShot: (data) => {
          commit("setTasks", data);
        },
      });
    },
    // Listens to sign in state
    userStateListener: ({commit}) => {
      loginStateListener({
        onUserIsSignIn: (userCredentials) => {
          commit("setUser", userCredentials);
          router.push("/list");
        },
        onUserNotSignedIn: () => {
          commit("setUser", null);
          router.push("/");
        },
      });
    },
    // Signs the user in
    signUserIn: ({commit}) => {
      signIn((userCredentials: any) => {
        commit("setUser", userCredentials);
      });
    },
    signUserOut: () => {
      logout();
      router.push("/");
    },
  },
  modules: {},
});
