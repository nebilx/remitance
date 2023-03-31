import React from "react";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        console.log(resJson.message);
        register(resJson.message);

        setData({ ...data, isSubmitting: false, errorMessage: null });
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <h1>Register</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="first_name">
              First Name
              <input
                type="text"
                value={data.first_name}
                onChange={handleInputChange}
                name="first_name"
                id="first_name"
                required
              />
            </label>

            <label htmlFor="last_name">
              Last Name
              <input
                type="text"
                value={data.last_name}
                onChange={handleInputChange}
                name="last_name"
                id="last_name"
                required
              />
            </label>

            <label htmlFor="email">
              Email Address
              <input
                type="email"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
                required
              />
            </label>

            <label htmlFor="phone">
              Phone Number
              <input
                type="tel"
                value={data.phone}
                onChange={handleInputChange}
                name="phone"
                id="phone"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
                required
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                <img className="spinner" src={logo} alt="loading icon" />
              ) : (
                "Register"
              )}
            </button>
            <label
              className="label-id"
              onClick={() => {
                navigate("/");
              }}
            >
              Already have account{" "}
            </label>
          </form>
        </div>
      </div>
    </div>
  );

  function register(t_email) {
    return (
      <div id="popup1" class="overlay">
        <div class="popup">
          <h2 class="ver_h1">Verify</h2>
          <a
            class="close"
            onClick={() => {
              navigate("/");
            }}
          >
            &times;
          </a>
          <div class="content">{t_email}</div>
        </div>
      </div>
    );
  }
}

export default Register;
