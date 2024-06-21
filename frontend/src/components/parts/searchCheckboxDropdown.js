import React, { useEffect, useRef, useState } from "react";
import "./searchCheckboxDropdown.css";

const SearchCheckboxDropdown = ({
  selectedTypes,
  setSelectedTypes,
  placeholder,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  const selectAll = () => {
    if (selectedTypes.length === options.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(options);
    }
  };

  // CLOSE DROPDOWN ON MOUSE CLICK OUTSIDE
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
    <div className="dropdown-container">
      <section onClick={toggleDropdown}>
        <span className="truncated-text">
          {selectedTypes.length === 0
            ? placeholder
            : selectedTypes.length <= 2
            ? selectedTypes.join(", ")
            : selectedTypes.length + ` selected`}
        </span>
        <span className="arrow">&#x2335;</span>
      </section>
      {isOpen && (
        <div className="dropdown-options" ref={containerRef}>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.length === options.length}
              onChange={selectAll}
            />
            Select All
          </label>
          <hr />
          {options.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCheckboxDropdown;
