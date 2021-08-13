import {loginStateListener, logout, signIn} from "@/firebaseAPI";
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
  },
  getters: {
    getUser: (state) => () => state.user,
  },
  modules: {},
  actions: {
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
    signUserOut: async ({commit}) => {
      await logout();
      commit("setUser", null);
    },
  },
});
