import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import SocialMediaIcons from "./../parts/social-media-icons";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const checkAuthentication = async () => {
      if (!isAuthenticated) {
        console.log("User is not authenticated.");
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/profile",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserName(data.user.email);
        } else {
          console.log(
            "Authentication check failed: User not authenticated or other non-200 response."
          );
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(
          "Network error or CORS issue when trying to fetch user profile:",
          error
        );
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/logout",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        localStorage.removeItem("isAuthenticated");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="header-main-container">
      <div className="header-container">
        <div className="logo">
          {/* <Link to="/">
            <img
              src={require("../../assets/images/polovni-automobili-logo.png")}
              alt="logo"
            />
          </Link> */}
          <a href="/">
            <img
              src={require("../../assets/images/polovni-automobili-logo.png")}
              alt="logo"
            />
          </a>
        </div>
        <div className="social-media">
          <SocialMediaIcons />
        </div>
        <div className="menu-icon" onClick={toggleMenu} ref={menuRef}>
          &#9776;
        </div>
        {!loading && (
          <div className={`buttons ${showMenu ? "show" : ""}`}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="button1"
                >
                  Moj profil <br />
                  <span>{userName}</span>
                </button>
                <button onClick={handleLogout} className="button2">
                  ODJAVI SE
                </button>
                <button
                  onClick={() => navigate("/postavi-oglas")}
                  className="button3"
                >
                  POSTAVI OGLAS
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="button1">
                  PRIJAVI SE <br />
                  <span>Moj profil</span>
                </button>
                <button onClick={handleRegister} className="button2">
                  REGISTRUJ SE
                </button>
                <button onClick={handleLogin} className="button3">
                  POSTAVI OGLAS
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
