import "./App.css";
import React from "react";
import { user_InitialState, user_Reducer } from "./user.reducer";
import Header from "./component/header";
import Transaction from "./component/transaction";
import Login from "./component/login";
import Cookies from "js-cookie";
export const AuthContext = React.createContext();
export const TransactionContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(user_Reducer, user_InitialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    const accessToken = JSON.parse(localStorage.getItem("token") || null);

    console.log(Cookies.get("refreshToken"));
    if (user && accessToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          data: user,
          accessToken,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Header />
      <div className="App">
        {!state.isAuthenticated ? <Login /> : <Transaction />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
