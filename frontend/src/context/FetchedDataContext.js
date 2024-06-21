import React, { createContext, useCallback, useEffect, useState } from "react";

export const Data = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [infoData, setInfoData] = useState([]);
  const itemsPerPage = 25;

  const fetchPageFromFilteredData = useCallback(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return infoData.slice(start, end);
  }, [page, infoData]);

  useEffect(() => {
    setData(fetchPageFromFilteredData());
  }, [page, infoData, fetchPageFromFilteredData]);

  const nextPageHandler = (event) => {
    event.preventDefault();
    const maxPages = Math.ceil(infoData.length / itemsPerPage);
    setPage((prev) => (prev >= maxPages ? maxPages : prev + 1));
  };

  const prevPageHandler = (event) => {
    event.preventDefault();
    setPage((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const fetchCarsFromApi = async (startPage) => {
    const numberOfPagesToFetchAtOnce = 25;
    const urls = [
      process.env.REACT_APP_BACKEND_URL + "/cars-db",
      ...Array.from({ length: numberOfPagesToFetchAtOnce }).map(
        (_, index) =>
          `https://www.polovniautomobili.com/json/v1/getLast24hAds/26/${
            startPage + index
          }`
      ),
    ];

    const allRequests = urls.map((url) => fetch(url).then((res) => res.json()));

    try {
      const allData = await Promise.all(allRequests);

      // Separate the database data and the API data
      const dbData = allData[0];
      const apiData = allData.slice(1);

      const classifiedsData = apiData
        .map((data) => data.classifieds || [])
        .flat();

      setInfoData((prevData) => {
        const combinedData = [...prevData, ...dbData, ...classifiedsData];
        const uniqueData = Array.from(
          new Set(combinedData.map((car) => car.AdID))
        ).map((id) => combinedData.find((car) => car.AdID === id));
        return uniqueData;
      });

      if (classifiedsData.length > 0) {
        fetchCarsFromApi(startPage + numberOfPagesToFetchAtOnce); // Fetch next set of API data if there is more
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCarsFromApi(1); // Fetch data from the API and DB starting from page 1
    };

    fetchData();
  }, []);

  const uniqueBrandNames = [
    ...new Set(infoData.map((item) => item.brandName)),
  ].sort();

  const getModelsForBrand = (brand, data) => {
    return [
      ...new Set(
        data
          .filter((item) => item.brandName === brand)
          .map((item) => item.modelName)
      ),
    ].sort();
  };

  const brandToModelsMap = uniqueBrandNames.reduce((acc, brand) => {
    acc[brand] = getModelsForBrand(brand, infoData);
    return acc;
  }, {});

  return (
    <Data.Provider
      value={{
        data,
        nextPageHandler,
        prevPageHandler,
        uniqueBrandNames,
        infoData,
        brandToModelsMap,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
