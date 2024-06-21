import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = {
      email: document.getElementsByName("email")[0].value,
      password: document.getElementsByName("password")[0].value,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      // console.log(data);

      // Check if the response was successful
      if (response.ok) {
        console.log("Login successful!");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img
            src={require("../assets/images/polovniautomobili-logo.png")}
            alt="polovni-automobili-logo"
          />
        </Link>
        <div className="login-form-container">
          <div className="car-smile-logo">
            <img
              src={require("../assets/images/car_smile.png")}
              alt="smile-car-logo"
            />
          </div>
          <form>
            <input placeholder="E-mail" name="email" type="email" />
            <input placeholder="Password" name="password" type="password" />
            <button onClick={loginHandler} className="login-next-button">
              Dalje <span>&#10140;</span>
            </button>
            {error && <p className="error-message">{error}</p>}
            <p>Nemaš nalog?</p>
            <div className="login-register-button">
              <button onClick={() => navigate("/register")}>
                Registruj se
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
