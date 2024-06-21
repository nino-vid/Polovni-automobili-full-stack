import "./RegistrationSuccess.css";
import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="registrationSuccess-container">
      <div className="container">
        <Link to="/">
          <img
            src={require("../assets/images/polovniautomobili-logo.png")}
            alt="logo"
          />
        </Link>
        <p>Hvala na registraciji!</p>
        <div className="text1">
          <p>
            Kako bi tvoj nalog postao aktivan neophodno je kliknuti na
            aktivacioni link koji se nalazi unutar obaveštenja koje je poslato
            na tvoju e-mail adresu.
          </p>
        </div>
        <div className="text2">
          <p>
            Ukoliko poslato obaveštenje ne vidiš u okviru tvoj inbox
            direktorijuma, proveri da Link je stiglo u oviru direktorijuma za
            nepoželjnu poštu(Spam/Junk).
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
