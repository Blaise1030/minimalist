import {
  addUserTask,
  getAllUserTasks,
  getUserTasks,
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
    todos: null,
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
    getTasks: (state) => () => state.todos,
  },
  actions: {
    userCreatesTask: (_, {userTask}) => addUserTask({userTask}),
    userTaskCheckOrUncheck: ({state}, {isCheck, taskId}) => {
      userTaskCheckOrUncheck({
        taskId,
        userId: (state?.user || {uid: ""}).uid,
        isDone: isCheck,
      });
    },
    // Gets all the user to do tasks
    userToDoListeners: async ({commit, state}) => {
      getAllUserTasks({
        userId: (state?.user || {uid: ""}).uid,
        listId: "0",
        onSnapShot: (data) => {
          commit("setTasks", data);
          console.log(data);
          if (router.currentRoute.value.name === "Main") {
            router.push("/list");
          }
        },
      });
    },
    // Listens to sign in state
    userStateListener: ({commit, dispatch, state}) => {
      loginStateListener({
        onUserIsSignIn: async (userCredentials) => {
          commit("setUser", userCredentials);
          dispatch("userToDoListeners");
          commit(
            "setTasks",
            await getUserTasks({userId: userCredentials?.uid, listId: "0"})
          );
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
