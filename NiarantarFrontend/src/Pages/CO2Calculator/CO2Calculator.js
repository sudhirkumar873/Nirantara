import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { showError, showSuccess } from "../../toast";
import LocationAutocomplete from "../../Components/utils/locationFinder";
import calculateDistance from "../../Components/utils/distanceCalculatebylatlon";
import axios from "axios";
import { calculateCO2eqEmissions } from "../../Components/utils/Co2e";

const CO2Calculator = () => {
  const containerStyle = {
    display: "flex",
  };
  const tableStyle = {
    width: "80%",
    margin: "0 auto",
  };
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [scoordinates, setSCoordinates] = useState({ lat: 0, lng: 0 });
  const [dcoordinates, setDCoordinates] = useState({ lat: 0, lng: 0 });
  const [Vehical, setVehical] = useState([]);
  const [fuel, setfuel] = useState([]);
  const [address, setAddress] = useState("");
  const [daddress, setdAddress] = useState("");
  const [Distance, setDistance] = useState(0);
  const [FuelUsed, setFuelUsed] = useState(0);
  const [result, setresult] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((response) => {
        // console.log(response.data.allVehicle);
        setVehical(response.data.data);
        console.log("data set", response.data.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Status Code:", error.response.status);
          console.error("Response Data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  }, []);

  const [formData, setFormData] = useState({
    vehicleType: "",
    fuelType: "",
    vehicleAge: "",
    source: "",
    destination: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // If you want to see the selected value immediately in the console, you can log it separately
    if (name === "vehicleType") {
      const selectedVehicle = Vehical.find((veh) => veh.vehicleID === value);
      console.group(selectedVehicle);
      if (selectedVehicle) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          fuelType: selectedVehicle.fuelType,
        }));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    //Check if required fields are filled
    const { vehicleType, fuelType, source, destination } = formData;
    if (!vehicleType) {
      showError("Please select the Vehical !");
      return;
    }

    if (address == "") {
      showError("Please select the source !");
      return;
    }

    if (daddress == "") {
      showError("Please select the destination !");
      return;
    }

    const distance = calculateDistance(
      scoordinates.lat,
      scoordinates.lng,
      dcoordinates.lat,
      dcoordinates.lng
    );
    setDistance(distance.toFixed(2));
    console.log(formData);
    // showSuccess(`Distance between source and destination: ${distance.toFixed(2)} km`);
    const vehicalype = Vehical.find(
      (veh) => veh.vehicleID === formData.vehicleType
    );
    // alert(vehicalype?.vehicleEffeciency)
    showSuccess(`Fuel Used : ${distance / vehicalype?.vehicleEffeciency} L`);
    setFuelUsed(distance / vehicalype?.vehicleEffeciency);
    const ans = calculateCO2eqEmissions(
      distance,
      vehicalype?.vehicleEffeciency,
      vehicalype.fuelType
    );
    setresult(true);
    document.querySelector(".C02").innerHTML = ans.toFixed(2);
    showSuccess(`Total CO2eq emissions: ${ans.toFixed(2)} kg`);
  };

  const handlesourceLocation = (newCoordinates) => {
    setSCoordinates(newCoordinates);
    console.log("sourve", newCoordinates);
  };

  const handleDEstinationLocation = (newCoordinates) => {
    setDCoordinates(newCoordinates);
    console.log("des", newCoordinates);
  };

  const Resetform = () => {
    document.querySelector(".C02").innerHTML = "";
    setFormData({
      vehicleType: "",
      fuelType: "",
      vehicleAge: "",
      source: "",
      destination: "",
    });
    setAddress("");
    setdAddress("");
    setresult(false);
  };

  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={tableStyle}>
        <Header />
        <div>
          <div>
            <Typography variant="h5">Emission Calculator</Typography>
          </div>
          <div>
            <Paper
              elevation={3}
              style={{
                padding: 20,
                height: "50%",
                width: "60%",
              }}
            >
              <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="userRole">Vehicle</InputLabel>
                      <Select
                        labelId=""
                        className="rolesSelect"
                        name="vehicleType"
                        label="Vehicle"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        sx={{
                          "&:focus": {
                            borderColor: "green", // Change the border color when focused
                          },
                        }}
                      >
                        {Vehical.map((item, idx) => (
                          <MenuItem
                            style={{ height: "auto" }}
                            key={item.vehicleID}
                            value={item.vehicleID}
                          >
                            {item.vehicleID}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      // label="fuel "
                      placeholder="fuel"
                      variant="outlined"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      // label="Vehicle Age"
                      placeholder="Vehicle Age"
                      variant="outlined"
                      name="vehicleAge"
                      value={formData.vehicleAge}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                  {/* I want to get the data in the form of latest location */}
                    <LocationAutocomplete
                      onSelectLocation={handlesourceLocation}
                      coordinates={coordinates}
                      address={address}
                      setAddress={setAddress}
                      setCoordinates={setCoordinates}
                      placeHolder={"Source"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                  {/* This is the Location loader in the page which is taking place for the map */}
                    <LocationAutocomplete
                      onSelectLocation={handleDEstinationLocation}
                      coordinates={coordinates}
                      address={daddress}
                      setAddress={setdAddress}
                      setCoordinates={setCoordinates}
                      placeHolder={"Destination"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      style={{
                        color: "white",
                        margin: "3px 0",
                        padding: "14px",
                        backgroundColor: "black",
                        fontWeight: "600",
                        height: "53px",
                        width: "100%",
                        fontFamily: "Lora",
                        textTransform: "none",
                      }}
                    >
                      Calculate Emission
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
          <br />
          <div style={{ display: result ? "block" : "none" }}>
            <div className="df jsb">
              <h2>Your CO2e Footprint </h2>
              <button
                className="btn"
                style={{ background: "#111", color: "#fff", padding: "10px" }}
                onClick={Resetform}
              >
                reset
              </button>
            </div>
            <hr />
            <h4>
              {" "}
              CO2e - <span className="C02"></span> kg{" "}
            </h4>
            <div className="df jsb co2details mt-5">
              <p>
                vehicle : <span>{formData.vehicleType}</span>
              </p>
              {FuelUsed !== 0 ? (
                <p>
                  ⛽ <span> {FuelUsed.toFixed(2)} L</span>
                </p>
              ) : null}

              <p>
                Fuel : <span>{formData.fuelType}</span>{" "}
              </p>
            </div>
            <div className="df jsb co2details">
              <p>
                Source : <span> {address}</span>
              </p>
              {Distance !== 0 ? (
                <p>
                  ⬅️ <span> {Distance} KM</span>➡️
                </p>
              ) : null}

              <p>
                Destination : <span>{daddress}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CO2Calculator;
