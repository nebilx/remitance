import React from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav id="navigation">
      <h1 href="#" className="logo">
        Remittance
      </h1>
      <button
        onClick={() => {
          navigate("/");
          dispatch({
            type: "LOGOUT",
          });
        }}
      >
        {state.isAuthenticated && <h1>Hi {state.user.first_name} (LOGOUT)</h1>}
      </button>
    </nav>
  );
};

export default Header;
