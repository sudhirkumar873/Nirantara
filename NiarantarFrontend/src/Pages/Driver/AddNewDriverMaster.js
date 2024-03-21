import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import saveFormData from "./saveFormData";
import { showSuccess, showError } from '../../toast'; 
import { TextField } from "@mui/material";
import axios from "axios";
import "./DriverTable.css"

const AddNewDriver = () => {
  const Navigate = useNavigate();

  const generateRandom4DigitNumber = () => {
    return `DVR${Math.floor(Math.random() * 900) + 101}`;
  };

  const [driverId, setDriverId] = useState(generateRandom4DigitNumber());
  const [driverName, setDriverName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [phone, setphone] = useState("");

  const handleClickSubmit = (e) => {
    e.preventDefault();

    
    saveFormData({
      DriverID:driverId,
      DriverName:driverName,
      LicenseNumber:licenseNumber,
      PhoneNumber:phone
  });

    Navigate("/DriverMaster");
  };

  const containerStyle = {
    display: "flex",
  };

  

  const formStyle = {
    padding: "10px",
    borderRadius: "10px",
    width: "684px",
    margin: "none",
    height: "313px",
    backgroundColor: "white",
  };

  return (
    <div style={containerStyle}>
      <div >
        <Sidebar />
      </div>
      <div style={{ width: "80%" ,margin:'0 auto ' }}>
        <Header />
        <h2>Driver Master</h2>
        <div style={formStyle}>
          <form className="driverform">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%" }}>
                <label htmlFor="driverId">Driver ID</label>
                <TextField
                  sx={{ width: "300px", height: "39px" }}
                  id="driverId"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  required
                  disabled
                />
              </div>

              <div style={{ width: "100%" }}>
                <label htmlFor="driverName">Driver Name</label>
                <TextField
                  sx={{ width: "300px", height: "39px" }}
                  id="driverName"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  required
                />
              </div>
            </div>


            <div  className="df jsb">
            <div style={{ justifyContent: "left", marginTop: "10%" }}>
              <label htmlFor="licenseNumber">License Number</label>
              <br />
              <TextField
                sx={{ width: "300px", height: "39px" }}
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div>

            <div style={{  marginTop: "10%",marginRight:'30px' }}>
              <label htmlFor="licenseNumber">Phone Number</label>
              <br />
              <TextField
                sx={{ width: "300px", height: "39px" }}
                id="licenseNumber"
                value={phone}
                type="number"
                onChange={(e) => setphone(e.target.value)}
                required
              />
            </div>
            </div>

         
            
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "7%",
              }}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "black",
                  width: "280px",
                  padding: "7px 30px 7px 30px",
                  height: "40px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
                onClick={handleClickSubmit}
              >
                <h5>
                  <b>Submit</b>
                </h5>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDriver;
