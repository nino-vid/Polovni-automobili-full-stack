import { useState, useContext } from "react";
import "./search-form.css";

import { Data } from "../../context/FetchedDataContext";
import { UseCarBrandHandler } from "../../hooks/carBrandHandler";

import { AiFillCar } from "react-icons/ai";
import { useSubmitSearchHandler } from "../../hooks/submitSearchHandler";
import PriceInput from "../parts/priceInputSearch";
import SearchCheckboxDropdown from "../parts/searchCheckboxDropdown";
import SearchValueDropdown from "../parts/searchValueDropdown";

const SearchForm = ({ setCurrentPage }) => {
  const [priceInputValue, setPriceInputValue] = useState("");
  const [carModelValue, setCarModelValue] = useState("Svi modeli");

  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [selectedTypesOfCar, setSelectedTypesOfCar] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [carCondition, setCarCondition] = useState([]);
  const [color, setColor] = useState([]);
  const [doorsNum, setDoorsNum] = useState([]);
  const [gearBox, setGearBox] = useState([]);

  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const { uniqueBrandNames, brandToModelsMap, infoData } = useContext(Data);
  const [carBrandValue, setCarBrandValue, isCarBrandChecked] =
    UseCarBrandHandler("Sve marke", setCarModelValue);

  const modelsForSelectedBrand = brandToModelsMap[carBrandValue] || [];

  // So i can use hook inside submit form
  const handleSearchSubmit = useSubmitSearchHandler();

  const toggleMoreOptions = () => {
    setShowMoreOptions((prevState) => !prevState);
  };

  // Search by year
  const startYear = 2024;
  const endYear = 1990;
  const length = startYear - endYear + 1;
  const yearOptions = Array.from({ length: length }, (_, index) =>
    (startYear - index).toString()
  );

  return (
    <div className="search-parent-container">
      <div className="container">
        <div className="search-div">
          <div className="table">
            <AiFillCar size={32} className="auto-table-logo" />
            <p>
              Automobili
              <span className="broj-oglasa">
                {infoData.length} oglasa pripada kategoriji "Putnička vozila"
              </span>
            </p>
          </div>
          <div className="search-options">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (setCurrentPage) {
                  setCurrentPage(1);
                }
                handleSearchSubmit(
                  carBrandValue,
                  carModelValue,
                  priceInputValue,
                  yearFrom,
                  yearTo,
                  selectedTypesOfCar,
                  selectedFuelTypes,
                  carCondition,
                  color,
                  doorsNum,
                  gearBox
                );
              }}
            >
              <div className="third-row">
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
                <PriceInput
                  priceInputValue={priceInputValue}
                  setPriceInputValue={setPriceInputValue}
                />
              </div>
              <div className="second-row">
                <div className="car-year">
                  <SearchValueDropdown
                    selectedTypes={yearFrom}
                    setSelectedTypes={setYearFrom}
                    placeholder="Godište"
                    options={yearOptions}
                  />
                  <SearchValueDropdown
                    selectedTypes={yearTo}
                    setSelectedTypes={setYearTo}
                    placeholder="Do"
                    options={yearOptions}
                  />
                </div>
                <div className="checkbox karoserija">
                  <SearchCheckboxDropdown
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

                <div className="car-search-button">
                  <button className="search-button">PRETRAGA</button>
                </div>
              </div>
              <div className="third-row">
                <div className="checkbox">
                  <SearchCheckboxDropdown
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
                <div className="checkbox">
                  <SearchValueDropdown
                    selectedTypes={carCondition}
                    setSelectedTypes={setCarCondition}
                    placeholder="Polovna i nova vozila"
                    options={[
                      "Polovna i nova vozila",
                      "Samo polovna vozila",
                      "Samo nova vozila",
                    ]}
                  />
                </div>
                <button
                  type="button"
                  onClick={toggleMoreOptions}
                  className="detaljna-pretraga"
                >
                  DETALJNA PRETRAGA<span className="arrow">&#x2335;</span>
                </button>
                <div className="car-search-button2">
                  <button className="search-button">PRETRAGA</button>
                </div>
              </div>

              {showMoreOptions && (
                <div className="additional-options">
                  <hr />
                  <div className="third-row">
                    <div className="checkbox">
                      <SearchCheckboxDropdown
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
                      <SearchCheckboxDropdown
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
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="youtube-video">
          <iframe
            width="340"
            height="200"
            src="https://www.youtube.com/embed/lsqjaD3j7Nw?controls=1&modestbranding=1&showinfo=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
