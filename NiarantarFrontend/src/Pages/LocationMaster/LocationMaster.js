import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"; // Assuming the correct path to your Sidebar component
import LocationTable from "./LocationTable";
import Header from "../../Components/Header/Header";
import axios from "axios";

const LocationMaster = () => {
  const [data, setData] = useState([]);
  const containerStyle = {
    display: "flex",
  };

  const tableStyle = {
    width: "80%",
    margin: "auto",
  };

  // const [data, setData] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/location")
      .then((response) => {
        console.log("locationdata", response);
        setData(response.data);
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
  return (
    <div style={containerStyle}>
      <div>
        <Sidebar />
      </div>
      <div style={tableStyle}>
        <div>
          <Header />
        </div>
        <div>
          <LocationTable data={data.allLocations} />
        </div>
      </div>
    </div>
  );
};

export default LocationMaster;
