import React, { useState, useRef } from "react";
import "./footer.css";
import SocialMediaIcons from "../parts/social-media-icons";
import { useSubmitSearchHandler } from "../../hooks/submitSearchHandler";

const Footer = () => {
  const [highlight, setHighlight] = useState(false);
  const handleSearchSubmit = useSubmitSearchHandler();
  const paragraphRef = useRef(null);

  const submitSearch = (brand, model) => {
    window.scrollTo(0, 0);
    handleSearchSubmit(brand, model);
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    setHighlight(true);
    paragraphRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setHighlight(false);
    }, 3000);
  };

  return (
    <div className="parent">
      <div className="container">
        <div className="child1">
          <div className="sub-div top-models">
            <h3>Najtraženiji modeli</h3>
            <div className="div">
              <button onClick={() => submitSearch("Audi", "A4")}>
                Audi A4
              </button>
              <button onClick={() => submitSearch("Audi", "A6")}>
                Audi A6
              </button>
              <button onClick={() => submitSearch("Volkswagen", "Golf 5")}>
                Volkswagen Golf 5
              </button>
            </div>
            <div className="div">
              <button onClick={() => submitSearch("Audi", "A3")}>
                Audi A3
              </button>
              <button onClick={() => submitSearch("BMW", "318")}>
                BMW Serija 3
              </button>
              <button onClick={() => submitSearch("Škoda", "Octavia")}>
                Škoda Octavia
              </button>
            </div>
          </div>

          <div className="sub-div fast-links">
            <h3>Brzi linkovi</h3>
            <ul>
              <li>
                <a href="#">Procena vozila</a>
              </li>
              <li>
                <a href="#">Sigurna kupovina polovnih automobila bez prevare</a>
              </li>
              <li>
                <a href="#">Oglasi na Email</a>
              </li>
              <li>
                <a href="#">Knjiga utisaka</a>
              </li>
              <li>
                <a href="#">Prednosti oglašavanja</a>
              </li>
              <li>
                <a href="#">Česta pitanja</a>
              </li>
              <li>
                <a href="#">Digitalno oglašavanje</a>
              </li>
              <li>
                <a href="#">O nama</a>
              </li>
              <li>
                <a href="#">Uslovi korišćenja</a>
              </li>
              <li>
                <a href="#">Obaveštenje o privatnosti</a>
              </li>
              <li>
                <a href="#">Pružaš auto usluge</a>
              </li>
              <li>
                <a href="#">Mobilne aplikacije</a>
              </li>
              <li>
                <a href="#">Prijatelji sajta</a>
              </li>
            </ul>
          </div>

          <div className="sub-div">
            <h3>Kontakt</h3>

            <a href="#" className="button" onClick={handleContactClick}>
              Kontaktiraj nas
            </a>
            <div className="social-media-icons">
              <SocialMediaIcons />
            </div>
            <div className="container-app-stores">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../../assets/images/google-play-logo2.png")}
                  alt="Google Play Store"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../../assets/images/app-store-logo.png")}
                  alt="App Store"
                />
              </a>
              <a
                href="https://appgallery.huawei.com/Featured"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require("../../assets/images/app-gallery-logo.png")}
                  alt="AppGallery Store"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="child2">
          <img
            src={require("../../assets/images/inspira-grupa-white-text.png")}
            alt="company logo"
          />
        </div>

        <div className="child3">
          <p ref={paragraphRef} className={highlight ? "highlight" : ""}>
            Sadržaj sajta predstavljen je samo u edukativne i informativne svrhe
            --- Nino Vidosavljević --- ninosavljevic@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
