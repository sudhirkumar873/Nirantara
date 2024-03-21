import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { showSuccess, showError } from "../../toast";

const AddNewTrip = () => {
  const [dragging, setDragging] = useState(false);
  const generateRandom4DigitNumber = () => {
    return `TRIP${Math.floor(Math.random() * 900) + 101}`;
  };
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate1, setSelectedDate1] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  const [Drivers, setDrivers] = useState([]);
  const [vehical, setvehical] = useState([]);
  const [locations, setlocations] = useState([]);

  useEffect(() => {
    // Use an asynchronous function to make the axios calls
    const fetchData = async () => {
      try {
        // Use await to wait for the promises to resolve
        const driverResponse = await axios.get(
          "http://localhost:5000/api/getDriver"
        );
        console.log("driver", driverResponse.data);
        setDrivers(driverResponse.data);

        const vehicalResponse = await axios.get(
          "http://localhost:5000/api/vehicle"
        );
        console.log("veh", vehicalResponse.data.data);
        setvehical(vehicalResponse.data.data);

        const locationres = await axios.get(
          "http://localhost:5000/api/location"
        );
        console.log("loc", locationres.data.allLocations);
        setlocations(locationres.data.allLocations);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    // Call the asynchronous function
    fetchData();
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    // handleImageUpload(file);
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear - index);
  const [tripData, setTripData] = useState({
    tripID: generateRandom4DigitNumber(),
    Date: "",
    selectDriver: "",
    tripstartdate: "",
    tripenddate: "",
    vehicleSource: "",
    driverID: "",
    vehicalID: "",
    vehicleDestination: "",
    DistanceTravelled: 0,
    StartOdoReading: 0,
    EndOdoReading: 0,
    vehicleCapacity: "",
    vehicleEffeciency: "",
    fuelType: "",
  });

  const validateForm = () => {
    if (!tripData.Date) {
      showError("Please select the Trip Date ");
      return false;
    }
    if (!tripData.selectDriver) {
      showError("Please select the driver ");
      return false;
    }
    if (!tripData.tripstartdate || !tripData.tripenddate) {
      showError("Please Enter the trip start and End Date  ");
      return false;
    }
    if (!tripData.vehicleSource || !tripData.vehicleDestination) {
      showError("Please Enter the trip source and Destination  ");
      return false;
    }

    if (!tripData.vehicalID) {
      showError("Please select the Vehicle  ");
      return false;
    }
    if (!tripData.EndOdoReading || !tripData.StartOdoReading) {
      showError("Please Enter start and End odometer reading");
      return false;
    }

    if (tripData.EndOdoReading < tripData.StartOdoReading) {
      showError(
        "End odometer Reading should be greater than start odometer reading"
      );
      return false;
    }

    if (!tripData.vehicleCapacity) {
      showError("Please Enter the Load Capicity  ");
      return false;
    }
    if (!tripData.vehicleEffeciency) {
      showError("Please Enter the Fuel Consumed ");
      return false;
    }

    return true;
  };

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    setTripData({
      ...tripData,
      tripstartdate: formatDate(date),
    });
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    setTripData({
      ...tripData,
      tripenddate: formatDate(date),
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTripData({
      ...tripData,
      Date: formatDate(date),
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTripData((prevTripData) => {
      let updatedData = {
        ...prevTripData,
        [name]:
          name === "tripstartdate" || name === "tripenddate"
            ? formatDate(value)
            : value,
      };

      // Check if the changed field is "selectDriver"
      if (name === "selectDriver") {
        // Find the selected driver from the Drivers array
        const selectedDriver = Drivers.find(
          (driver) => driver.DriverName === value
        );
        if (selectedDriver) {
          updatedData = {
            ...updatedData,
            driverID: selectedDriver.DriverID,
          };
        }
      }

      if (name === "vehicalID") {
        const selectedveh = vehical.find((veh) => veh.vehicleID === value);

        if (selectedveh) {
          updatedData = {
            ...updatedData,
            fuelType: selectedveh.fuelType,
          };
        }
      }
      if (name === "EndOdoReading" || name === "StartOdoReading") {
        const startOdo = parseFloat(updatedData.StartOdoReading) || 0;
        const endOdo = parseFloat(updatedData.EndOdoReading) || 0;

        updatedData = {
          ...updatedData,
          DistanceTravelled: Math.abs(endOdo - startOdo),
        };
      }

      // Update the state
      setTripData(updatedData);

      return updatedData;
    });
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form
    console.log("trip data", tripData);
    const isValid = validateForm();
    if (isValid) {
      console.log(tripData);
      // Handle form submission if the form is valid
      axios
        .post("http://localhost:5000/api/trips", tripData)
        .then((res) => {
          console.log(res);
          showSuccess("Trip Added !");
          // Redirect to the dashboard page
          window.history.back();
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <Sidebar />
      </div>
      <div style={{ width: "80%", margin: "auto " }}>
        <Header />
        <Typography component="h1" style={{ margin: "0 20px" }} variant="h5">
          Trips
        </Typography>
        <Container
          component="main"
          maxWidth="100%"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <Paper elevation={3} style={{ padding: "20px", marginTop: "10px" }}>
            <form className="tripform">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <label htmlFor="col1">Trip ID</label>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="col1"
                    name="tripID"
                    onChange={handleInputChange}
                    disabled
                    placeholder="1122"
                    value={tripData.tripID}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label>Date Entry</label>
                  <br />
                  <DatePicker
                    selected={selectedDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()} // Disable future dates
                    customInput={
                      <TextField
                        variant="outlined"
                        // placeholder="2244"
                        fullWidth
                        id="col2"
                        name="Date"
                        value={selectedDate}
                        // placeholder="DD-MM-YYYY"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="col2">Select Driver</label>
                    <Select
                      // label="Type"
                      fullWidth
                      id="col3"
                      name="selectDriver"
                      onChange={handleInputChange}
                    >
                      {Drivers.map((item, idx) => (
                        <MenuItem
                          style={{ height: "auto" }}
                          key={item._id}
                          value={item.DriverName}
                        >
                          {item.DriverName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="col4">Trip Start Date</label>
                  <DatePicker
                    onChange={handleDateChange1}
                    selected={selectedDate1}
                    value={selectedDate1}
                    maxDate={new Date()} // Disable future dates
                    customInput={
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="col4"
                        value={selectedDate1}
                        name="tripstartdate"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="col5">Source</label>
                  <FormControl fullWidth variant="outlined">
                    <Select
                      // label="Type"
                      fullWidth
                      id="col3"
                      name="vehicleSource"
                      onChange={handleInputChange}
                    >
                      {locations.map((item, idx) => (
                        <MenuItem
                          style={{ height: "auto" }}
                          key={item.locationName}
                          value={item.locationName}
                        >
                          {item.locationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="col2">Trip End Date</label>
                    <DatePicker
                      onChange={handleDateChange2}
                      selected={selectedDate2}
                      value={selectedDate2}
                      maxDate={new Date()} // Disable future dates
                      customInput={
                        <TextField
                          variant="outlined"
                          fullWidth
                          placeholder="2233"
                          id="col5"
                          name="tripenddate"
                          value={selectedDate2}
                          // onChange={handleInputChange}
                        />
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  Driver ID
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Driver ID"
                    disabled
                    id="col5"
                    name="driverID"
                    value={tripData.driverID}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  Vehicle Number
                  <FormControl fullWidth variant="outlined">
                    <Select
                      // label="Type"
                      fullWidth
                      id="col3"
                      name="vehicalID"
                      onChange={handleInputChange}
                    >
                      {vehical.map((item, idx) => (
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
                <Grid item xs={4}>
                  Assume Efficiency
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Efficiency"
                    id="col5"
                    name="efficiency"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  Stop Time
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Stop Time"
                    id="col5"
                    name="stopTime"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  Destination
                  <FormControl fullWidth variant="outlined">
                    <Select
                      // label="Type"
                      fullWidth
                      id="col3"
                      name="vehicleDestination"
                      onChange={handleInputChange}
                    >
                      {locations.map((item, idx) => (
                        <MenuItem
                          style={{ height: "auto" }}
                          key={item.locationName}
                          value={item.locationName}
                        >
                          {item.locationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  Distance Travelled
                  <TextField
                    variant="outlined"
                    fullWidth
                    // placeholder="2233"
                    id="col5"
                    name="DistanceTravelled"
                    value={tripData.DistanceTravelled}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  Enter Start Odometer Reading
                  <TextField
                    variant="outlined"
                    fullWidth
                    // placeholder="2233"
                    id="col5"
                    name="StartOdoReading"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  Trip End Odometer Reading
                  <TextField
                    variant="outlined"
                    fullWidth
                    // placeholder="2233"
                    id="col5"
                    name="EndOdoReading"
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* For Uploading the Image */}
                <Grid item xs={4}>
                  <label htmlFor="col8">Fuel Type</label>
                  <TextField
                    variant="outlined"
                    fullWidth
                    // placeholder="2233"
                    id="col5"
                    name="fuelType"
                    value={tripData.fuelType}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6} className="mt-3">
                  <label htmlFor="col8">Upload</label>
                  <div
                    style={{
                      width: "100%",
                      padding: "35px",
                      border: "2px dotted lightgrey",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "12px",
                    }}
                  >
                    <label>
                      Drag and Drop or{" "}
                      <Button
                        sx={{
                          backgroundColor: "rgba(192, 192, 192, 1)",
                          color: "white",
                        }}
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                      >
                        Browse
                      </Button>
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div>
                      {tripData.image ? (
                        <img
                          src={tripData.image}
                          alt="Uploaded"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      ) : null}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-3">
                <Grid item xs={4}>
                  <label htmlFor="col9">Fuel Consumed in Ltr</label>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="1210"
                    id="col9"
                    name="vehicleEffeciency"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label htmlFor="col9">Load On Truck</label>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="1021"
                    id="col9"
                    name="vehicleCapacity"
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    width: "280px",
                    padding: "7px 45px 7px 45px",
                    height: "40px",
                    borderRadius: "5px",
                    textAlign: "center",
                    marginTop: "5%",
                    fontSize: "16px",
                    fontFamily: "Lora",
                    textTransform: "none",
                  }}
                  onClick={handleSubmit} // Use onClick instead of type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};
export default AddNewTrip;
