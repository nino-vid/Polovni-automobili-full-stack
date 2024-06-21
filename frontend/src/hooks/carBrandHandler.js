import { useEffect, useState } from "react";

// Function for canceling choosed option to default

export const UseCarBrandHandler = (initialValue, resetModelValue) => {
  const [carBrandValue, setCarBrandValue] = useState(initialValue);
  const [isCarBrandChecked, setIsCarBrandChecked] = useState(false);

  useEffect(() => {
    if (carBrandValue !== "cancel" && carBrandValue !== "Sve marke") {
      setIsCarBrandChecked(true);
      resetModelValue("Svi modeli");
    } else {
      setCarBrandValue("Sve marke");
      setIsCarBrandChecked(false);
      resetModelValue("Svi modeli");
    }
  }, [carBrandValue, resetModelValue]);

  return [carBrandValue, setCarBrandValue, isCarBrandChecked];
};
