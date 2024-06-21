import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import Header from "../components/header/Header";
import NavigationBar from "../components/NavigationBar/navigation-bar";
import Footer from "../components/footer/footer";
import SearchForm from "../components/SearchForm/search-form";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const location = useLocation();
  const [selectedLabel, setSelectedLabel] = useState("Osnovno");

  const initialFilteredData = location.state?.filteredData || [];
  const firstCar = initialFilteredData[0];
  const secondCar = initialFilteredData[1];

  // slice firstCar and secondCar
  const filteredData = initialFilteredData.slice(2);
  // const filteredData = initialFilteredData;

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // settings for pagination, 25 cars per page
  const itemsPerPage = 25;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const TwoCarItemsInRow = ({ car }) => {
    if (!car) return null;

    return (
      <div className="car-link">
        <a href={`/car-info/${car.AdID}`} className="car-info-link">
          <div style={{ height: "70%" }}>
            <img
              src={
                (car.photoLink && car.photoLink[0]?.url) || car.photoLink?.[3]
              }
              alt="car"
            />
          </div>
          <div className="car-details-container">
            <div className="car-item-row">
              <p>
                {car.title ? car.title : `${car.brandName} ${car.modelName}`}
              </p>
              <p>
                {car.tag_block
                  ? car.tag_block.slice(0, car.tag_block.indexOf(",")).trim()
                  : `${car.price} \u20AC`}
              </p>
            </div>
            <div className="car-item-row">
              <p>
                {car.fuelType}/{car.year}
              </p>
              <p>📌 {car.city}</p>
            </div>
          </div>
        </a>
      </div>
    );
  };

  const SearchItem = () => {
    return (
      <div className="car-search-info">
        {currentItems.map((item) => (
          <a
            key={item.AdID}
            href={`/car-info/${item.AdID}`}
            className="car-info-link"
          >
            <div className="car-search-item">
              <img
                src={
                  item.photoLink?.[0]?.url
                    ? item.photoLink[0].url
                    : item.photoLink?.[3]
                }
                alt="car"
              />

              <div
                className={`search-info-details ${
                  item.new === false ? "used" : "new"
                }`}
              >
                <div className="second-row">
                  <p>
                    {item.title
                      ? item.title
                      : `${item.brandName} ${item.modelName}`}
                  </p>
                  <p className="price">
                    {item.tag_block
                      ? item.tag_block
                          .slice(0, item.tag_block.indexOf(","))
                          .trim()
                      : `${item.price} \u20AC`}
                  </p>
                </div>
                <div className="third-row">
                  <div className="column">
                    <p>
                      {item.year}. {item.chassis}
                    </p>
                    <p>{item.fuelType}</p>
                  </div>
                  <div className="column">
                    <p>{item.mileage} km</p>
                    <p>
                      {item.power}kW ({Math.floor(item.power * 1.341)}KS)
                    </p>
                  </div>
                  <div className="column">
                    <p>{item.gearBox}</p>
                    <p>{item.doornum}</p>
                  </div>
                </div>
                <div className="details-city">
                  {item.city && <p>📌 {item.city}</p>}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const Pagination = () => {
    const changePage = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };

    const previousPage = () => {
      if (currentPage > 1) {
        changePage(currentPage - 1);
      }
    };

    const nextPage = () => {
      if (currentPage < totalPages) {
        changePage(currentPage + 1);
      }
    };

    return (
      <div className="pagination">
        {currentPage !== 1 && <button onClick={previousPage}>&lt;</button>}

        {currentPage > 3 && <span>...</span>}

        {currentPage > 2 && (
          <button onClick={() => changePage(currentPage - 2)}>
            {currentPage - 2}
          </button>
        )}
        {currentPage > 1 && (
          <button onClick={() => changePage(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}

        <button className="active">{currentPage}</button>

        {currentPage < totalPages && (
          <button onClick={() => changePage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}
        {currentPage + 1 < totalPages && (
          <button onClick={() => changePage(currentPage + 2)}>
            {currentPage + 2}
          </button>
        )}

        {currentPage + 2 < totalPages && <span>...</span>}
        {currentPage !== totalPages && <button onClick={nextPage}>&gt;</button>}
      </div>
    );
  };

  const DisplayedCarsInfo = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(
      currentPage * itemsPerPage,
      initialFilteredData.length
    );
    return (
      <div className="displayed-cars-info">
        <p>
          Prikazano od {start} do {end} oglasa od ukupno{" "}
          {initialFilteredData.length}
        </p>
      </div>
    );
  };

  const SortSelect = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const options = [
      { label: "Osnovno", value: "default-ascending" },
      { label: "ceni uzlazno", value: "price-ascending" },
      { label: "ceni silazno", value: "price-descending" },
      { label: "godini proizvodnje uzlazno", value: "year-ascending" },
      { label: "godini proizvodnje silazno", value: "year-descending" },
      { label: "kilometraži uzlazno", value: "mileage-ascending" },
      { label: "kilometraži silazno", value: "mileage-descending" },
    ];

    const handleChange = (label, value) => {
      const [key, direction] = value.split("-");

      if (key === "default") {
        onSort(null);
        window.scrollTo(0, 0);
      } else {
        onSort({ key, direction });
        window.scrollTo(0, 0);
      }
      setIsOpen(false);
      setSelectedLabel(label);
    };

    useEffect(() => {
      function handleOutsideClick(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    return (
      <div className="sort-dropdown-container" ref={containerRef}>
        <section
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {selectedLabel}
          <span className="arrow">&#x2335;</span>
        </section>
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option) => (
              <button
                key={option.label}
                className="dropdown-option"
                onClick={() => handleChange(option.label, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <NavigationBar />
      <SearchForm setCurrentPage={setCurrentPage} />
      <div className="search-main-container">
        <div className="search-page-parent">
          <div className="search-page-container">
            <DisplayedCarsInfo />
            <div className="sort-and-pag">
              <Pagination />
              <SortSelect onSort={setSortConfig} />
            </div>
            <div className="two-cars">
              <TwoCarItemsInRow car={firstCar} />
              <TwoCarItemsInRow car={secondCar} />
            </div>
            <SearchItem />
            <DisplayedCarsInfo />
            <div className="sort-and-pag">
              <Pagination />
              <SortSelect onSort={setSortConfig} />
            </div>
            <div className="legend">
              <div className="left-container">
                <div className="square"></div>
                <div className="square"></div>
                <span> Polovna vozila</span>
              </div>
              <div className="right-container">
                <div className="square"></div>
                <div className="square"></div>
                <span> Nova vozila</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
