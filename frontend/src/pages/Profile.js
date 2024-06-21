import React, { useEffect, useRef, useState } from "react";
import Header from "./../components/header/Header";
import NavigationBar from "./../components/NavigationBar/navigation-bar";
import Footer from "./../components/footer/footer";
import Loader from "../components/parts/loader";
import { useNavigate } from "react-router-dom";
import "../pages/Profile.css";

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState();
  const [myCars, setMyCars] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.profilePhoto) {
            setProfilePhoto(data.user.profilePhoto.url);
          }
        } else {
          console.error("Failed to fetch profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/my-cars",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          const cars = data.map((car) => ({
            AdID: car.AdID,
            brandName: car.brandName,
            modelName: car.modelName,
            createdAt: car.createdAt,
            year: car.year,
          }));

          setMyCars(cars);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoadingCars(false);
      }
    };

    fetchMyCars();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/profile/uploadProfilePhoto",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Profile photo uploaded successfully");
        const responseData = await response.json();

        console.log(responseData);

        const user = responseData.user;
        if (user.profilePhoto && user.profilePhoto.url) {
          setProfilePhoto(user.profilePhoto.url);
        }
      } else {
        console.error("Error uploading profile photo:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const isLoading = isLoadingProfile || isLoadingCars;

  const deleteHandler = async (carId) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/obrisi-oglas/${carId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setMyCars((prevCars) => prevCars.filter((car) => car.AdID !== carId));
      } else {
        console.error("Failed to delete car:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <Header />
      <NavigationBar />
      <div className="main-container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="second-container">
            <div className="left-container">
              <div className="photo-container">
                <img src={profilePhoto} alt="Profile" />

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUpload}
                />

                <button
                  className="upload-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Okači sliku
                </button>
              </div>
            </div>
            <div className="right-container">
              <div className="aktivni-oglasi">
                <p>Aktivni oglasi</p>
                {myCars.length === 0 ? (
                  <p style={{ color: "rgb(152, 154, 157)" }}>
                    Trenutno nema aktivnih oglasa
                  </p>
                ) : (
                  myCars.map((car, index) => (
                    <div className="moji-oglasi-container">
                      <div
                        className="moji-oglasi"
                        key={index}
                        onClick={() => navigate(`/car-info/${car.AdID}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="car-title">
                          <span>
                            {car.year}. {car.brandName} {car.modelName}
                          </span>
                        </div>
                        <div className="car-id">
                          <span>ID:</span> {car.AdID}
                        </div>
                      </div>
                      <div
                        className="deleteButton"
                        onClick={() => deleteHandler(car.AdID)}
                      >
                        &#9003;
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
