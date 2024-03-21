import React, { useEffect, useState } from "react";
import HCV from "../../utils/Group 33.png";
import LCV from "../../utils/Group 33 (1).png";
import MCV from "../../utils/Group 33 (2).png";
import EV from "../../utils/EV.png";
import Dropdown from "react-bootstrap/Dropdown";

import "../../App.css";
import {
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Label,
} from "recharts";
import CircularProgressBar from "../../Components/ProgressBar/Progressbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { showSuccess } from "../../toast";

// import { Tooltip } from "chart.js";
const ChartComponent = () => {
  const data = [
    {
      name: "Page A1",
      thismonth: 4000,
      lastmonth: 2400,
    },
    {
      name: "Page B1",
      thismonth: 3000,
      lastmonth: 1398,
    },
    {
      name: "Page C1",
      thismonth: 2000,
      lastmonth: 9800,
    },
    {
      name: "Page D1",
      thismonth: 2780,
      lastmonth: 3908,
    },
    {
      name: "Page E1",
      thismonth: 1890,
      pv: 4800,
    },
  ];
  const data2 = [
    {
      name: "Petrol",
      petrol: 4000,
      Fuel: 240,
      amt: 2400,
    },
    {
      name: "Diesel",
      petrol: 3000,
      Fuel: 139,
      amt: 2210,
    },
    {
      name: "CNG",
      petrol: 2000,
      Fuel: 980,
      amt: 2290,
    },
    {
      name: "Electric",
      petrol: 2780,
      Fuel: 390,
      amt: 2000,
    },
    {
      name: "Other",
      petrol: 1890,
      Fuel: 480,
      amt: 2181,
    },
  ];
  const colorMap = {
    A: "#FF5733",
    B: "#33FF57",
    C: "#3357FF",
    // Add more mappings as needed
  };

  const data3 = [
    {
      name: "G",
      x: 6.67,
      fill: "black",
    },
    {
      name: "F",
      x: 2.63,
      fill: "white",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(""); // State to keep track of the selected option
  const [incrementValue, setIncrementValue] = useState("60%");
  const [triplenght, settriplenght] = useState(0);
  const [EmisionLimit, setEmisionLimit] = useState(0);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey); // Update the state with the selected option
  };

  const [vehicleCounts, setVehicleCounts] = useState({
    lcvCount: 0,
    mcvCount: 0,
    hcvCount: 0,
    scvCount: 0,
  });

  const getTripData = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/trips")
        .then((res) => {
          settriplenght(res.data.length);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getEmmsion = async () => {
    try {
      axios.get("http://localhost:5000/api/Emmsion").then((res) => {
        console.log("emmsion", res.data[0].EmmsionLimit);
        setEmisionLimit(res.data[0].EmmsionLimit);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmmsion();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((response) => {
        const vehicles = response.data.data;

        // Filter vehicles based on vehicleType
        const lcvCount = vehicles.filter(
          (vehicle) => vehicle.vehicleType === "LCV"
        ).length;
        const mcvCount = vehicles.filter(
          (vehicle) => vehicle.vehicleType === "MCV"
        ).length;
        const hcvCount = vehicles.filter(
          (vehicle) => vehicle.vehicleType === "HCV"
        ).length;
        const scvCount = vehicles.filter(
          (vehicle) => vehicle.vehicleType === "SCV"
        ).length;

        // Set the counts in the state
        setVehicleCounts({
          lcvCount,
          mcvCount,
          hcvCount,
          scvCount,
        });
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });

    //
    getTripData();
  }, []);

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //
  //     handleBlur(e.target.value);

  //   }
  // };

  const handleBlur = async (newEmisionLimit) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/updateEmission/65b8ef301dc86e5d2739cfde",
        { EmmsionLimit: newEmisionLimit }
      );

      console.log("emission", response.data.EmmsionLimit);
      // Assuming response.data contains the updated emission data
      // Adjust accordingly based on your API response structure
      setEmisionLimit(response.data.EmmsionLimit);
      showSuccess("Limit Updated !");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "-15px" }}>
      <b className="pageHeading">Dashbaord Overview</b>
      <br />
      Using the matrix and analytics of your organisation's audit.
      <div className="maincontainer" style={{}}>
        <div className="topcontainer">
          {/* Container for the 1st Container in the first Row */}
          <div className="topcontainer1">
            <div className="currenthead">
              <div className="topcontainer1row1">
                <div>Current Emission</div>
                <div>
                  <h4>
                    <b>600</b>
                  </h4>
                </div>
              </div>
            </div>

            <div
              className="topcontainer1row2"
              style={{ "--increment": incrementValue }}
            >
              <div>
                <RadialBarChart
                  width={170}
                  height={170}
                  data={data3}
                  innerRadius="100%"
                  outerRadius="50%"
                  startAngle={90}
                  endAngle={360}
                >
                  <RadialBar
                    minAngle={30}
                    dataKey="x"
                    clockWise={false}
                    background={{ fill: "white" }}
                  />
                  <Label value={`33%`} position="center" />
                </RadialBarChart>
                {/* <CircularProgressBar/> */}
              </div>
            </div>
            <div className="topcontainer1row3">
              <div
                className="EmissionContainer"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div className="EmissionDiv">
                  <div>Emission Limit</div>
                  <div>
                    <h2>
                      <input
                        style={{
                          fontWeight: "700",
                          background: "transparent",
                          width: "80%",
                        }}
                        className="transparentInput"
                        type="number"
                        value={EmisionLimit}
                        onChange={(e) => setEmisionLimit(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleBlur(e.target.value);
                          }
                        }}
                      />
                    </h2>
                  </div>
                </div>
                <div className="Measurementdropdown">
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="outlined" id="dropdown-basic">
                      Measurement
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Gallon">Gallon</Dropdown.Item>
                      <Dropdown.Item eventKey="Liters">Liters</Dropdown.Item>
                      <Dropdown.Item eventKey="Imperial Gallon">
                        Imperial Gallon
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Barrel">Barrel</Dropdown.Item>
                      <Dropdown.Item eventKey="Cubic Meters">
                        Cubic Meters
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Cubic Foot">
                        Cubic Foot
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kiloliters">
                        Kiloliters
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Megajoule(MG)">
                        Megajoule(MG)
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Gigajoule(GJ)">
                        Gigajoule(GJ)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {selectedOption && <p>Selected Option: {selectedOption}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* Container for the 2nd Container in the first Row */}
          <div className="topcontainer2">
            <div className="smalltopcontainer2col1">
              <div className="smalltopcontainer2col1row1">
                <div>All trips</div>
                <div>
                  <h2>{triplenght}</h2>
                </div>
              </div>
              <div className="">
                <Link
                  to="/trips"
                  style={{ color: "#333", textDecoration: "none" }}
                >
                  See Details
                </Link>
              </div>
            </div>
            <div className="smalltopcontainer2col1row2">
              <div className="smalltopcontainer2col1row1">
                <div>Pending</div>
                <div>
                  <h7>
                    <b>120</b>
                  </h7>
                </div>
              </div>
              <div className="">View Details</div>
            </div>
            <div className="smalltopcontainer2col3">
              <div className="smalltopcontainer2col1row1">
                <div>Approved</div>
                <div>
                  <b>300</b>
                </div>
              </div>
              <div className="">View Details</div>
            </div>
            <div className="smalltopcontainer2col4">
              <div className="smalltopcontainer2col1row1">
                <div>In Review</div>
                <div>
                  <b>100</b>
                </div>
              </div>
              <div className="">View Details</div>
            </div>
          </div>
          {/* Container for the 3rd Container in the first Row */}
          <div className="topcontainer3">
            <div className="container1">
              <div
                className="topcontainerSmaller1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/VehicleMaster?search=HCV">
                  <div>
                    <img src={HCV} />
                  </div>
                </Link>

                <div>HCV</div>
                <div>{vehicleCounts.hcvCount}</div>
              </div>
              <div
                className="topcontainerSmaller2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/VehicleMaster?search=LCV">
                  <div>
                    <img src={LCV} />
                  </div>
                </Link>

                <div>LCV</div>
                <div>{vehicleCounts.lcvCount}</div>
              </div>
            </div>
            <div className="container2">
              <div
                className="topcontainerSmaller3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/VehicleMaster?search=MCV">
                  <div>
                    <img src={MCV} />
                  </div>
                </Link>

                <div>MCV</div>
                <div>{vehicleCounts.mcvCount}</div>
              </div>
              <div
                className="topcontainerSmaller4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/VehicleMaster?search=SCV">
                  <div>
                    <img src={EV} />
                  </div>
                </Link>

                <div>SCV</div>
                <div>{vehicleCounts.scvCount}</div>
              </div>
            </div>
            <p style={{ float: "right", margin: "-10px 40px" }}>
              <Link
                to="/VehicleMaster"
                style={{ color: "#333", textDecoration: "none" }}
              >
                See all
              </Link>
            </p>
          </div>
        </div>
        <div className="bottomcontainer df jsb">
          <div className="bottomcontainer1">
            <div className="graphHeadline">
              Emission vs km run This Month vs Last Month
            </div>
            <BarChart width={500} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="thismonth" fill="#3854C8" />
              <Bar dataKey="lastmonth" fill="#BE7F34" />
            </BarChart>
          </div>
          <div className="bottomcontainer2">
            <div className="graphHeadline">Emission by fuel Category</div>
            <ComposedChart width={500} height={250} data={data2}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Fuel" fill="#BE7F34" />
            </ComposedChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
