import create from "zustand";

const useGlobalStore = create((set) => ({
  data: {
    isSignupOpen: false,
    tasks: [],
    formIsOpen: false,
    app_user: localStorage.getItem("app_user")
      ? JSON.parse(localStorage.getItem("app_user"))
      : null,
  },
  toggleTaskFormOpen: () =>
    set((state) => ({
      ...state,
      data: { ...state.data, formIsOpen: !state.data.formIsOpen },
    })),
  addTask: (payload) =>
    set((state) => ({
      ...state,
      data: { ...state.data, tasks: [payload, ...state.data.tasks] },
    })),

  toggleRemainder: (payload) =>
    set((state) => {
      const result = state.data.tasks.map((task) =>
        +task.id === +payload ? { ...task, remainder: !task.remainder } : task
      );
      return {
        ...state,
        data: { ...state.data, tasks: result },
      };
    }),

  deleteTask: (payload) =>
    set((state) => {
      const result = state.data.tasks.filter((task) => +task.id !== +payload);
      return {
        ...state,
        data: { ...state.data, tasks: result },
      };
    }),

  SIGNIN: (payload) =>
    set((state) => ({
      ...state,
      data: { ...state.data, app_user: payload },
    })),

  SIGNOUT: () =>
    set((state) => ({
      ...state,
      data: { ...state.data, app_user: null },
    })),

  addFollower: (payload) =>
    set((state) => ({
      ...state,
      data: { ...state.data, app_user: { ...state.data.app_user, followings: [...state.data.app_user.followings, payload] } },
    })),

  removeFollower: (payload) =>
    set((state) => ({
      ...state,
      data: { ...state.data, app_user: { ...state.data.app_user, followings: state.data.app_user.followings.filter(x => x._id !== payload) } },
    })),

}));




export default useGlobalStore;
