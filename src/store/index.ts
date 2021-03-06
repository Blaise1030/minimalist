import {
  addUserTask,
  getAllUserTasks,
  loginStateListener,
  logout,
  signIn,
  userTaskCheckOrUncheck,
  userTaskDelete,
} from "@/firebaseAPI";
import {Task} from "@/models";
import router from "@/router";
import {createStore} from "vuex";

export default createStore({
  state: {
    firebaseIsSetup: false,
    user: null,
    todos: [],
    checkedTodos: [],
    cachedTodos: [],
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
    setTasks(state, taskSnapshotList) {
      state.todos = taskSnapshotList;
    },
    setCheckedTask(state, checkedTask) {
      state.checkedTodos = checkedTask;
    },
    setCachedTask(state, cachedTodos) {
      state.cachedTodos = cachedTodos;
    },
  },
  getters: {
    getUser: (state) => () => state.user,
    getTasks: (state) => () => state.todos,
    getCheckedTask: (state) => () => state.checkedTodos,
    getCachedTask: (state) => () => state.cachedTodos,
  },
  actions: {
    segregateTasks: ({commit}, {data}) => {
      const sortTasks = (taskArray: Task[]): Task[] =>
        taskArray.sort((a: Task, b: Task) => (a.id < b.id ? 1 : -1));

      const doneTask = sortTasks(
        (data || []).filter((t: Task) => t.isDone && !t.isDeleted)
      );
      const undoneTask = sortTasks(
        (data || []).filter((t: Task) => !t.isDone && !t.isDeleted)
      );
      const cachedTasks = sortTasks(
        (data || []).filter((t: Task) => t.isDeleted)
      );
      commit("setTasks", undoneTask);
      commit("setCheckedTask", doneTask);
      commit("setCachedTask", cachedTasks);
    },
    userCreatesTask: (_, {userTask}) => addUserTask({userTask}),
    userCacheTask: (_, {taskId, userId}) =>
      userTaskDelete({
        taskId,
        userId,
      }),
    userTaskCheckOrUncheck: ({state}, {isCheck, taskId}) => {
      userTaskCheckOrUncheck({
        taskId,
        userId: (state?.user || {uid: ""}).uid,
        isDone: Boolean(isCheck),
      });
    },
    // Gets all the user to do tasks
    userToDoListeners: async ({state, dispatch}) => {
      getAllUserTasks({
        userId: (state?.user || {uid: ""}).uid,
        listId: "0",
        onSnapShot: (data) => {
          dispatch("segregateTasks", {data});
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
          state.firebaseIsSetup = true;
          commit("setUser", userCredentials);
          dispatch("userToDoListeners");
        },
        onUserNotSignedIn: () => {
          state.firebaseIsSetup = true;
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
