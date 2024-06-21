import CarItemForm from "../parts/car-item-form";
import { useContext } from "react";
import { Data } from "../../context/FetchedDataContext";
import "./Cars-List.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CarList = () => {
  const { data, nextPageHandler, prevPageHandler } = useContext(Data);

  return (
    <div className="car-list-parent-container">
      {Array.isArray(data) && data.length > 0 ? (
        <div className="container">
          <div className="car-list-container">
            {data.map((dataObj, index) => (
              <CarItemForm
                name={dataObj.brandName + " " + dataObj.modelName}
                price={
                  dataObj.tag_block
                    ? dataObj.tag_block
                        .slice(0, dataObj.tag_block.indexOf(","))
                        .trim()
                    : `${dataObj.price} \u20AC` // Euro sign using Unicode
                }
                imgUrl={
                  (dataObj.photoLink && dataObj.photoLink[0]?.url) ||
                  dataObj.photoLink?.[1]
                }
                year={dataObj.year}
                id={dataObj.AdID}
                key={index}
              />
            ))}
          </div>
          <div className="car-list-arrows">
            <a
              href="/"
              rel="noopener noreferrer"
              onClick={(event) => prevPageHandler(event)}
            >
              <IoIosArrowBack
                size={50}
                color="orange"
                style={{ marginRight: "1rem" }}
              />
            </a>
            <a
              href="/"
              rel="noopener noreferrer"
              onClick={(event) => nextPageHandler(event)}
            >
              <IoIosArrowForward
                size={50}
                color="orange"
                style={{ marginRight: "1rem" }}
              />
            </a>
          </div>
        </div>
      ) : (
        <div className="container loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default CarList;
