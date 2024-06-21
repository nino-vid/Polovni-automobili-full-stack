import React, { useEffect, useRef, useState } from "react";
import "./searchValueDropdown.css";

const SearchValueDropdown = ({
  name,
  selectedTypes,
  setSelectedTypes,
  placeholder,
  options,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (type) => {
    setSelectedTypes(type);
    setIsOpen(false);
  };

  const cancel = () => {
    setSelectedTypes(placeholder);
    setIsOpen(false);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        event.target !== containerRef.current.previousSibling
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
    <div className={`search-dropdown-container ${disabled ? "disabled" : ""}`}>
      <section onClick={!disabled ? toggleDropdown : undefined} name={name}>
        {selectedTypes.length === 0 ? placeholder : selectedTypes}
        <span className="arrow">&#x2335;</span>
      </section>
      {isOpen && (
        <div className="dropdown-options" ref={containerRef}>
          <button
            key="Cancel"
            className={`dropdown-option cancel-option ${
              disabled ? "disabled" : ""
            }`}
            onClick={!disabled ? cancel : undefined}
            disabled={disabled}
          >
            Poništi &#10005;
          </button>
          <hr />
          {options.map((type) => (
            <button
              key={type}
              className={`dropdown-option ${disabled ? "disabled" : ""}`}
              onClick={!disabled ? () => handleOptionClick(type) : undefined}
              disabled={disabled}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchValueDropdown;
