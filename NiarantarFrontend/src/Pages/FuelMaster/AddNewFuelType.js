import React, { useState, useEffect } from "react";
import { Navigate, useHistory, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { showSuccess, showError } from "../../toast";
import "./FuelPage.css";
// import Dropdown from "react-bootstrap/Dropdown";
import saveFormData from "./saveFormData";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
const measurementData = [
  // "Gallon",
  "Liters",
  // "Imperial Gallon",
  "Barrel",
  "Cubic Meters",
  "Cubic Foot",
  "Kiloliters",
  "Megajoule(MG)",
  "Watt",
];

const AddNewFuelType = () => {
  // const history = useHistory();
  const Navigate = useNavigate();
  const generateRandom4DigitNumber = () => {
    return `FUL${Math.floor(Math.random() * 900) + 101}`;
  };

  const [selectedMeasurement, setSelectedMeasurement] = useState("");

  const handleMeasurementSelect = (measurement) => {
    setSelectedMeasurement(measurement);
    setMeasurementType(measurement);
  };

  const [fuelId, setFuelId] = useState(generateRandom4DigitNumber());
  const [fuelType, setFuelType] = useState("");
  const [measurementType, setMeasurementType] = useState("");

  const handleClickSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // handleSubmit(e); // Call the handleSubmit function

    console.log(fuelId);
    console.log(fuelType);
    console.log(measurementType);
    if (!fuelId || !fuelType || !measurementType) {
      showError("Please fill out all required fields.");

      return;
    }
    // Increment fuelId by 1
    // setFuelId((prevFuelId) => {
    //   const nextFuelId = parseInt(prevFuelId.substr(3)) + 1;
    //   return `FUL${nextFuelId.toString().padStart(3, "0")}`;
    // });
    saveFormData({
      fuelID: fuelId,
      fuelType: fuelType,
      Measurement: measurementType,
    });
    // alert("Data saved");
    // window.history.back();
    Navigate("/fuelmaster");
  };

  const containerStyle = {
    display: "flex",
  };

  const formStyle = {
    // border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    width: "684px",
    margin: "none",

    backgroundColor: "white",
  };

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={{ width: "80%", margin: "0 auto " }}>
        <Header />
        <h2>Fuel Master</h2>
        <div style={formStyle}>
          <form className="fuelform">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%" }}>
                <InputLabel id="fuelID">Fuel ID</InputLabel>
                <TextField
                  sx={{ width: "300px", height: "39px" }}
                  id="fuelId"
                  // label="Fuel ID"
                  value={fuelId}
                  onChange={(e) => setFuelId(e.target.value)}
                  required
                />
              </div>
              <div style={{ width: "100%" }}>
                <InputLabel id="fuelType">Fuel Type</InputLabel>
                <FormControl style={{ width: "300px", height: "39px" }}>
                  {/* <InputLabel id="fuelType-label">Fuel Type</InputLabel> */}
                  <Select
                    labelId="fuelType-label"
                    id="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    required
                  >
                    <MenuItem value="petrol">Petrol</MenuItem>
                    <MenuItem value="diesel">Diesel</MenuItem>
                    <MenuItem value="hydrogen">Hydrogen</MenuItem>
                    <MenuItem value="electric">Electric</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* </div> */}
            </div>
            <br />
            <div className="df jsb">
              <div>
                {/* <label htmlFor="measurementType">Measurement Type</label> */}
                <label htmlFor="fuelType">Measurement Type</label>
                <br />
                <FormControl style={{ width: "300px", height: "39px" }}>
                  <Select
                    // labelId="measurementType-label"
                    id="measurementType"
                    value={selectedMeasurement}
                    onChange={(e) => handleMeasurementSelect(e.target.value)}
                    required
                  >
                    {/* <MenuItem value="">Select Measurement Type</MenuItem> */}
                    {measurementData.map((measurement, index) => (
                      <MenuItem key={index} value={measurement}>
                        {measurement}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <button
                style={{
                  color: "white",
                  margin: "24px 33px",
                  backgroundColor: "black",
                  width: "100%",
                  padding: "14px",

                  borderRadius: "5px",
                  textAlign: "center",
                }}
                // type="submit"
                onClick={handleClickSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewFuelType;
