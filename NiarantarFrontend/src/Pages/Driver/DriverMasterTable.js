import { Typography } from "@mui/material";
import React from "react";
import './DriverTable.css';
import { Link } from "react-router-dom";

const DriverTable = ({ data }) => {

  const reversedata = [...data].reverse()
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
          <h2>Driver Master</h2>
        </div>
        <Link to="/AddNewDriverMaster">
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
            <Typography>+ Add New Driver</Typography>
          </button>
        </Link>
      </div>
      <div className="table-container" style={{ maxHeight: "900px", overflowY: "auto" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">Driver ID</th>
              <th scope="col">Driver Name</th>
              <th scope="col">License Number</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {reversedata.map((driver, index) => (
              <tr
                key={driver.driverID}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <th scope="row">{driver.DriverID}</th>
                <td>{driver.DriverName}</td>
                <td>{driver.LicenseNumber}</td>
                <td>{driver?.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverTable;
