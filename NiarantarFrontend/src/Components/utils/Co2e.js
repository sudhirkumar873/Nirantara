
const CONVERSION_FACTOR_US_GALLON_TO_LITER = 3.78541178; // liters per US gallon

// Pure function to calculate CO2eq emissions
export const calculateCO2eqEmissions = (distance, fuelEfficiency, fuelType) => {
    console.log(distance)
    console.log( fuelEfficiency)
    console.log( fuelType)
  const emissionFactor = getEmissionFactor(fuelType);
  const fuelUsed = distance / fuelEfficiency; //litre
  return fuelUsed * emissionFactor;
};


const getEmissionFactor = (fuelType) => {
  // Emission factors in kg CO2eq per liter
  const emissionFactors = {
    petrol: 2.31,
    diesel: 2.659,

  };

  return emissionFactors[fuelType.toLowerCase()] || 0; 
};
