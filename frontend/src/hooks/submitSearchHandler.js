import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../context/FetchedDataContext";

export const useSubmitSearchHandler = () => {
  const { infoData } = useContext(Data);
  const navigate = useNavigate();

  return (
    brand,
    model,
    price,
    yearFrom,
    yearTo,
    selectedTypesOfCar,
    selectedFuelTypes,
    carCondition,
    color,
    doorsNum,
    gearBox
  ) => {
    let filteredData = [...infoData];

    if (brand && brand !== "Sve marke") {
      filteredData = filteredData.filter((item) => item.brandName === brand);
    }

    if (model && model !== "Svi modeli") {
      filteredData = filteredData.filter((item) => item.modelName === model);
    }

    if (price) {
      filteredData = filteredData.filter((item) => item.price <= price);
    }

    if (yearFrom && yearFrom !== "" && yearTo && yearTo !== "") {
      const minYear = Math.min(yearFrom, yearTo);
      const maxYear = Math.max(yearFrom, yearTo);
      filteredData = filteredData.filter(
        (item) => item.year >= minYear && item.year <= maxYear
      );
    } else {
      if (yearFrom && yearFrom !== "") {
        filteredData = filteredData.filter((item) => item.year >= yearFrom);
      }
      if (yearTo && yearTo !== "") {
        filteredData = filteredData.filter((item) => item.year <= yearTo);
      }
    }

    if (selectedTypesOfCar && selectedTypesOfCar.length) {
      filteredData = filteredData.filter((item) =>
        selectedTypesOfCar.includes(item.chassis)
      );
    }

    if (selectedFuelTypes && selectedFuelTypes.length) {
      filteredData = filteredData.filter((item) =>
        selectedFuelTypes.includes(item.fuelType)
      );
    }

    if (carCondition === "Samo nova vozila") {
      filteredData = filteredData.filter((item) => item.new === true);
    } else if (carCondition === "Samo polovna vozila") {
      filteredData = filteredData.filter((item) => item.new === false);
    }

    if (color && color.length) {
      filteredData = filteredData.filter((item) => color.includes(item.color));
    }

    if (doorsNum && doorsNum.length > 0) {
      filteredData = filteredData.filter((item) => item.doornum === doorsNum);
    }

    if (gearBox && gearBox.length) {
      filteredData = filteredData.filter((item) =>
        gearBox.includes(item.gearBox)
      );
    }

    return navigate("/auto-oglasi", { state: { filteredData } });
  };
};
