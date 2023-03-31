const user_InitialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const user_Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export { user_InitialState, user_Reducer };
