import { useState } from "react";
import "./Register.css";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const registerHandler = async () => {
    if (!isCheckboxChecked) {
      setError("Morate prihvatiti uslove korišćenja da biste se registrovali.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = {
      email: document.getElementsByName("email")[0].value,
      password: document.getElementsByName("password")[0].value,
      repeatPassword: document.getElementsByName("repeatPassword")[0].value,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href =
          "https://polovni-automobili.vercel.app/registration-success";
      } else {
        setError(data.message || "Registration failed");
        setLoading(false); // Stop loading if registration fails
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <>
      <div className="register-container">
        <Link to="/">
          <img
            src={require("../assets/images/polovniautomobili-logo.png")}
            alt="logo"
          />
        </Link>
        <div className="register-form-container">
          <div className="register-left-container">
            <form>
              <p>E-mail adresa</p>
              <input
                placeholder="Unesi e-mail adresu"
                name="email"
                type="email"
              />
              <p>Lozinka</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Unesi minimum 6 karaktera"
                className="password-input"
                style={{ marginBottom: 0 }}
                name="password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
              <p>Ponovi lozinku</p>
              <input name="repeatPassword" type="password" />
            </form>
            <div className="privacy-policy">
              <label>
                <input
                  type="checkbox"
                  required="required"
                  autoComplete="off"
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
                <span>
                  Prihvatam{" "}
                  <a target="_blank" href="/">
                    Uslove korišćenja
                  </a>
                  , Obaveštenje o privatnosti, i potvrđujem da sam lice koje je
                  navršilo 15 godina.
                </span>
              </label>
            </div>
            <div className="register-button">
              <button onClick={registerHandler} disabled={loading}>
                {loading ? (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  "Registruj se"
                )}
              </button>
            </div>
            {/* {error && <p className="error-message">{error}</p>} */}
            <div className="error-container">
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="register-info">
              <p>
                <span>
                  <BsInfoCircle
                    size={16}
                    color="orange"
                    style={{ marginRight: "0.2rem" }}
                  />
                </span>
                Kako da se registrujem?
              </p>
            </div>
            <div className="register-login-link">
              <p>
                Već imaš nalog? <Link to="/login">Uloguj se</Link>
              </p>
            </div>
          </div>
          <div className="register-right-container">
            <p>PREDNOSTI NAŠIH REGISTROVANIH KORISNIKA</p>
            <ul>
              <li>
                <span>&#x2713;</span>Besplatan probni period oglašavanja
              </li>
              <li>
                <span>&#x2713;</span>Tvoja ponuda na računarima, mobilnim i
                tablet uređajima
              </li>
              <li>
                <span>&#x2713;</span>Prodajna podrška iz kancelarije i na terenu
              </li>
              <li>
                <span>&#x2713;</span>Lako upravljanje velikim brojem oglasa
              </li>
              <li>
                <span>&#x2713;</span>Najpovoljnije isticanje oglasa pomoću
                kredita
              </li>
              <li>
                <span>&#x2713;</span> Mogućnost isticanja u odnosu na druge
                prodavce
              </li>
              <li>
                <span>&#x2713;</span>Detaljan pregled statistike oglasa
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
