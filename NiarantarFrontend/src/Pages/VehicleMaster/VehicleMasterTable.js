import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const VehicleMasterTable = ({ data }) => {
  if (!Array.isArray(data)) {
    return null; // or display an error message
  }
  // Sample data for testing
  console.log("vehdata", data);

  const reversedata = [...data].reverse();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="table-heading">
          <h2>Vehicle Master</h2>
        </div>
        <div>
          <Link to="/AddNewVehicleMaster">
            <button
              style={{
                width: "160px",
                height: "39px",
                padding: "none",
                color: "black",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "none",
                boxShadow: "0px 4px 8px rgba(0, 0, 0.1, 0.2)",
              }}
            >
              <Typography>+ Add New Vehicle</Typography>
            </button>
          </Link>
        </div>
      </div>
      <div className="table-container">
      <div  className="scrollable-table">
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">Vehicle ID</th>
            <th scope="col">Vehicle Number</th>
            <th scope="col">Type</th>
            <th scope="col">Make</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Last Service</th>
            <th scope="col">PUC Date</th>
            <th scope="col">Type of Fuel</th>
            <th scope="col">Fuel Efficiency(Km/lit)</th>
            <th scope="col">Load Capacity(ton)</th>
          </tr>
        </thead>
        <tbody>
          {reversedata.map((vehicleData, index) => (
            <tr
              key={vehicleData.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <th scope="row">{vehicleData.vehicleID}</th>
              <td>{vehicleData.vehicleNumber}</td>
              <td>{vehicleData.vehicleType}</td>
              <td>{vehicleData.vehicleMake}</td>
              <td>{vehicleData.vehicleModel}</td>
              <td>{vehicleData.vehicleYear}</td>
              <td>{vehicleData.lastService}</td>
              <td>{vehicleData.vehiclePOC}</td>
              <td>{vehicleData.fuelType}</td>
              <td>{vehicleData.vehicleEffeciency}</td>
              <td>{vehicleData.vehicleCapacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default VehicleMasterTable;
