import React, { useState, useRef, useContext } from "react";
import Header from "./../components/header/Header";
import NavigationBar from "./../components/NavigationBar/navigation-bar";
import Footer from "./../components/footer/footer";

import { Data } from "../context/FetchedDataContext";
import { UseCarBrandHandler } from "../hooks/carBrandHandler";
import SearchValueDropdown from "../components/parts/searchValueDropdown";
import "../pages/PostaviOglas.css";

const PostaviOglas = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Drag and Drop Photos

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const deleteImage = (imageName) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  // Car Info (Marka i model)

  const { uniqueBrandNames, brandToModelsMap } = useContext(Data);

  const [carModelValue, setCarModelValue] = useState("Svi modeli");
  const [carBrandValue, setCarBrandValue, isCarBrandChecked] =
    UseCarBrandHandler("Sve marke", setCarModelValue);

  const modelsForSelectedBrand = brandToModelsMap[carBrandValue] || [];

  // Car Info (Osnovne informacije)

  const [selectedTypesOfCar, setSelectedTypesOfCar] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);

  // Car Info (dodatne informacije)

  const [color, setColor] = useState([]);
  const [doorsNum, setDoorsNum] = useState([]);
  const [gearBox, setGearBox] = useState([]);
  const [carCondition, setCarCondition] = useState([]);

  // Submit handler

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData();

    // Append text fields to FormData
    formData.append("brand", carBrandValue);
    formData.append("model", carModelValue);
    formData.append("godiste", document.getElementsByName("godiste")[0].value);
    formData.append("karoserija", selectedTypesOfCar);
    formData.append("gorivo", selectedFuelTypes);
    formData.append(
      "kilometraza",
      document.getElementsByName("kilometraza")[0].value
    );
    formData.append("snagaKS", document.getElementsByName("snagaKS")[0].value);
    formData.append("snagaKW", document.getElementsByName("snagaKW")[0].value);
    formData.append("boja", color);
    formData.append("vrata", doorsNum);
    formData.append("menjac", gearBox);
    formData.append("stanje", carCondition);
    formData.append("cena", document.getElementsByName("cena")[0].value);

    // Append files to FormData
    const input = document.querySelector('input[type="file"]');
    for (const file of input.files) {
      formData.append("files", file);
    }

    // Log form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value.name || value}`);
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/postavi-oglas",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Successful");
        // navigate("/");
        window.location.href = "/";
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "An error occurred, please try again.");
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(""); // Clear the error message after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred, please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage(""); // Clear the error message after 3 seconds
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <NavigationBar />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="main-container-oglas">
          <div className="image-container">
            <div className="top">
              <p>Unos fotografija</p>
            </div>
            <div
              className="drag-area"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {isDragging ? (
                <span className="select">Ispustite slike ovde</span>
              ) : (
                <>
                  Prevuci fotografije u polje ili{" "}
                  <span className="select" role="button" onClick={selectFiles}>
                    Dodaj
                  </span>
                </>
              )}
              <input
                name="files"
                type="file"
                className="file"
                multiple
                ref={fileInputRef}
                onChange={onFileSelect}
              ></input>
            </div>
            <div className="container">
              {images.map((image, index) => (
                <div className="image" key={image.name}>
                  <span
                    className="delete"
                    onClick={() => deleteImage(image.name)}
                  >
                    &times;
                  </span>
                  <img src={image.url} alt={image.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="car-info-container">
            <div className="segment-container">
              <p className="p">Marka i model</p>
              <div className="brand-and-model">
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={carBrandValue}
                    setSelectedTypes={setCarBrandValue}
                    placeholder="Sve marke"
                    options={uniqueBrandNames}
                  />
                </div>
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={carModelValue}
                    setSelectedTypes={setCarModelValue}
                    placeholder="Svi modeli"
                    disabled={!isCarBrandChecked}
                    options={modelsForSelectedBrand}
                  />
                </div>
              </div>
            </div>
            <div className="segment-container">
              <p className="p">Osnovne informacije</p>
              <div className="info-container">
                <div className="checkbox">
                  <input
                    className="input"
                    placeholder="Godište"
                    type="text"
                    maxLength="4"
                    name="godiste"
                  />
                </div>
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={selectedTypesOfCar}
                    setSelectedTypes={setSelectedTypesOfCar}
                    placeholder="Karoserija"
                    options={[
                      "Limuzina",
                      "Hečbek",
                      "Karavan",
                      "Kupe",
                      "Kabriolet/Roudster",
                      "Monovolumen",
                      "Džip/SUV",
                      "Pickup",
                    ]}
                  />
                </div>
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={selectedFuelTypes}
                    setSelectedTypes={setSelectedFuelTypes}
                    placeholder="Gorivo"
                    options={[
                      "Benzin",
                      "Dizel",
                      "Benzin + Gas (TNG)",
                      "Benzin + Metan (CNG)",
                      "Električni pogon",
                      "Hibridni pogon",
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="segment-container">
              <p>Dodatne informacije</p>
              <div className="info-container">
                <div className="checkbox">
                  <input
                    className="input"
                    placeholder="Kilometraža"
                    type="text"
                    maxLength="7"
                    name="kilometraza"
                  />
                </div>
                <div className="checkbox">
                  <input
                    className="input"
                    placeholder="Snaga (KS)"
                    type="text"
                    maxLength="4"
                    name="snagaKS"
                  />
                </div>
                <div className="checkbox">
                  <input
                    className="input"
                    placeholder="Snaga (kW)"
                    type="text"
                    maxLength="4"
                    name="snagaKW"
                  />
                </div>
              </div>
              <div className="info-container">
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={color}
                    setSelectedTypes={setColor}
                    placeholder="Boja"
                    options={[
                      "Bela",
                      "Bež",
                      "Bordo",
                      "Braon",
                      "Crna",
                      "Crvena",
                      "Kameleon",
                      "Krem",
                      "Ljubičasta",
                      "Narandžasta",
                      "Plava",
                      "Siva",
                      "Smeđa",
                      "Tirkiz",
                      "Teget",
                      "Zelena",
                      "Zlatna",
                      "Žuta",
                    ]}
                    name="boja"
                  />
                </div>
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={doorsNum}
                    setSelectedTypes={setDoorsNum}
                    placeholder="Broj vrata"
                    options={["2/3 vrata", "4/5 vrata"]}
                  />
                </div>
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={gearBox}
                    setSelectedTypes={setGearBox}
                    placeholder="Menjač"
                    options={[
                      "Manuelni 4 brzine",
                      "Manuelni 5 brzina",
                      "Manuelni 6 brzina",
                      "Automatski / poluautomatski",
                    ]}
                  />
                </div>
              </div>
              <div className="info-container">
                <div className="brand-and-model">
                  <div className="checkbox">
                    <SearchValueDropdown
                      selectedTypes={carCondition}
                      setSelectedTypes={setCarCondition}
                      placeholder="Stanje"
                      options={["Polovno vozilo", "Novo vozilo"]}
                    />
                  </div>
                  <div className="checkbox">
                    <input
                      className="input"
                      placeholder="Cena"
                      type="text"
                      maxLength="6"
                      name="cena"
                    />
                    <span className="price">&euro;</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-oglas">
              <button
                className="postavi-oglas"
                type="submit"
                name="submit"
                id="submit"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  "POSTAVI OGLAS"
                )}
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PostaviOglas;
