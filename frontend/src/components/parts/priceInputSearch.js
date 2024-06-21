import { useRef, useEffect } from "react";
import "./priceInputSearch.css";

const PriceInput = ({ priceInputValue, setPriceInputValue }) => {
  const incrementIntervalRef = useRef(null);
  const decrementIntervalRef = useRef(null);

  const handleIncrement = () => {
    setPriceInputValue((prev) =>
      (prev === "" ? 1 : parseInt(prev) + 1).toString()
    );
  };

  const handleDecrement = () => {
    setPriceInputValue((prev) =>
      (prev === "" || parseInt(prev) <= 0 ? "" : parseInt(prev) - 1).toString()
    );
  };

  const handlePriceInputChange = (event) => {
    const newValue = event.target.value;
    // allowing only numbers and empty string
    if (newValue === "" || !isNaN(newValue)) {
      setPriceInputValue(newValue);
    }
  };

  // CHANGE PRICE ON MOUSE HOLD ON BUTTON

  const startIncrement = () => {
    handleIncrement();
    incrementIntervalRef.current = setInterval(handleIncrement, 50);
  };

  const startDecrement = () => {
    handleDecrement();
    decrementIntervalRef.current = setInterval(handleDecrement, 50);
  };

  const stopIncrement = () => {
    clearInterval(incrementIntervalRef.current);
  };

  const stopDecrement = () => {
    clearInterval(decrementIntervalRef.current);
  };

  useEffect(() => {
    // Clear intervals when component unmounts
    return () => {
      clearInterval(incrementIntervalRef.current);
      clearInterval(decrementIntervalRef.current);
    };
  }, []);

  return (
    <div className="price">
      <input
        value={priceInputValue}
        onChange={handlePriceInputChange}
        placeholder="Cena do"
      />
      <span>
        &euro;
        <span>
          <button
            type="button"
            onMouseDown={startIncrement}
            onMouseUp={stopIncrement}
            onMouseLeave={stopIncrement}
            className="arrow-button"
          >
            &#9650;
          </button>
          <button
            type="button"
            onMouseDown={startDecrement}
            onMouseUp={stopDecrement}
            onMouseLeave={stopDecrement}
            className="arrow-button"
          >
            &#9660;
          </button>
        </span>
      </span>
    </div>
  );
};

export default PriceInput;
