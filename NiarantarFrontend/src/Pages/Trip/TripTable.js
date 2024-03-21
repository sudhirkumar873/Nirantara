import React, { useState, useEffect } from "react";
import "./Trip.css";
import { Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "axios";
// import { calculateFuel } from "../../utility/calculateFuel";
const TripTable = () => {
  const [list, setList] = useState([]);
  const getTripData = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/trips")
        .then((res) => {
          const reversedata = res.data.reverse();
          setList(reversedata);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTripData();
    // console.log(list);
  }, []);
  useEffect(() => {
    console.log(list); // This will log the updated state whenever it changes
  }, [list]);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#dfedd1",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <div>
      <div
        className="table-heading"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "left", fontWeight: "600" }}
        >
          <h4>Trips</h4>
        </div>
        <div>
          <Link to="/AddNewTrip" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <button
                style={{
                  padding: "8px 20px", // Corrected padding value
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0.1, 0.2)",
                }}
              >
                <Typography>+ Add New Trip</Typography>
              </button>
            </div>
          </Link>
        </div>
      </div>
      <br />
      <div
        className="table-container"
        style={{ maxHeight: "900px", overflowY: "auto" }}
      >
        <div className="tablewapper">
          <table className="styled-table">
            <thead className="thead" style={{ zIndex: "1" }}>
              <tr>
                <th>Date</th>
                <th>Trip ID</th>
                {/* <th>Vehicle Number</th> */}
                <th>Driver ID</th>
                <th>Source</th>
                <th style={{ width: "400px" }}>Destination</th>
                <th>Time for Stoppage</th>
                <th>Distance Travelled</th>
                <th>Type of Fuel</th>
                <th>Assumed Efficiency</th>
                {/* <th>Stop Time/Idle Time</th> */}
                <th>Fuel Consumed</th>
                <th className="overflow" style={{ maxWidth: "180px" }}>
                  Cargo Load on Truck
                </th>
                <th className="overflow" style={{ maxWidth: "180px" }}>
                  Fuel Paid by client
                </th>
                {/* <th>Emission Per Ton</th> */}
                {/* <th>Total Emission Per Trip</th> */}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>
                    {new Date(item.Date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{item.tripID}</td>
                  {/* <td>{item.vehicleNumber}</td> */}
                  <td>{item.selectDriver}</td>
                  <td className="overflow">{item.vehicleSource}</td>
                  <td className="overflow">{item.vehicleDestination}</td>
                  <td>{item.stopTime}</td>
                  <td>{item.DistanceTravelled}</td>
                  <td>{item.fuelType}</td>
                  <td>{item.vehicleEffeciency}</td>
                  {/* <td>{item.stopTime}</td> */}
                  <td>{item.StartOdoReading}</td>
                  {/* <td>{item.}</td> */}
                  {/* <td>{calculateFuel()}</td> */}
                  <td className="overflow">{item.vehicleCapacity}</td>
                  {item?.emissionPerTon && <td>{item?.emissionPerTon}</td>}
                  {item?.totalEmissionPerTrip && (
                    <td>{item.totalEmissionPerTrip}</td>
                  )}
                  <td>
                    {" "}
                    <FormControlLabel
                      control={
                        <IOSSwitch sx={{ m: 1 }} defaultChecked={false} />
                      }
                      label=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TripTable;
