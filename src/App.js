import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { user_InitialState, user_Reducer } from "./reducer/user.reducer";
import Header from "./component/header";
import Transaction from "./component/transaction";
import Login from "./component/login";
import Register from "./component/register";
export const AuthContext = React.createContext();
export const TransactionContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(user_Reducer, user_InitialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    const accessToken = JSON.parse(localStorage.getItem("token") || null);

    // console.log(Cookies.get("refreshToken"));
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
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Header />
        {!state.isAuthenticated ? (
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
