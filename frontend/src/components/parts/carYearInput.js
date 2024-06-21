const CarYearInput = ({ placeholder, yearValue, setYearValue }) => {
  const startYear = 2023;
  const endYear = 1990;
  const length = startYear - endYear + 1;

  const years = Array.from({ length: length }, (_, index) => startYear - index);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "cancel") {
      setYearValue("");
    } else {
      setYearValue(selectedValue);
    }
  };

  return (
    <select value={yearValue} onChange={handleChange}>
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      <option value="cancel">cancel</option>
      <hr />
      {years.map((year) => (
        <option key={year} value={year.toString()}>
          {year.toString()}
        </option>
      ))}
    </select>
  );
};

export default CarYearInput;
