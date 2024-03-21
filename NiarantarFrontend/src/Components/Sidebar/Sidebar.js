import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import nirantara from "../../utils/nirantaralogo.png";
import dashboardlogo from "../../utils/dashboardlogo.png";
import triplogo from "../../utils/triplogo.png";
import location from "../../utils/locationlogo.png";
import vehicle from "../../utils/vehiclelogo.png";
import fuel from "../../utils/fuellogo.png";
import driver from "../../utils/fuellogo.png";
import co2 from "../../utils/co2logo.png";
import permission from "../../utils/permissionlogo.png";
import support from "../../utils/Supportlogo.png";
import documentation from "../../utils/Documentationlogo.png";
import arrowright from "../../utils/arrowright.png";

const Sidebar = ({ setActiveButton }) => {
  const lc = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const accessModule = localStorage.getItem('access');
  // console.log

  // Dashboard, Trips, Location Master, Fuel Master, CO2 Calculator, Role and Permission, Support, Documentation
  const allButtons = [
    "Dashboard",
    "Trips",
    "Location Master",
    "Vehicle Master",
    "Driver Master",
    "Fuel Master",
    "CO2 Calculator",
    "Role & Permission",
    "Support",
    "Documentation",
  ];

 
  const moduleMapping = {
    "Dashboard": ["Dashboard", dashboardlogo ,"Dashboard"],
    "Trips": ["trips", triplogo,"Trips"],
    "Location Master": ["locationmaster", location,"Location Master"],
    "Vehicle Master": ["VehicleMaster", vehicle ,"Vehicle Master"],
    "Driver Master": ["DriverMaster", driver , "Driver Master"],
    "Fuel Master": ["fuelmaster", fuel ,"Fuel Master"],
    "CO2 Calculator": ["co2calculatorpage", co2 , "CO2 Calculator"],
    "Role & Permission": ["rollsandpermission", permission ,"Role & Permission"],
    "Support": ["SupportPage", support ,"Support"],
    "Documentation": ["Documentation", documentation ,"Documentation"],
  };

  // Filter modules based on the ones present in localStorage.access
  const accessibleModules = allButtons.filter(module => accessModule?.includes(module));

  // Map the corresponding routes and images for the filtered modules
  const buttons = accessibleModules.map(module => moduleMapping[module][2]);
  const images = accessibleModules.map(module => moduleMapping[module][1]);
  const routes = accessibleModules.map(module => moduleMapping[module][0]);

  const buttonRouteMap = {};
for (let i = 0; i < buttons.length; i++) {
  buttonRouteMap[routes[i]] = buttons[i];
}

console.log("buttonRouteMap",buttonRouteMap);

  console.log("buttons",buttons)

  const handleButtonClick = (index) => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      style={{ backgroundColor: "#fff", boxShadow: '0 0 5px 0 rgba(0,0,0,0.4)' }}
    >
      <div className="logo" onClick={toggleSidebar}>
        <img src="/logo.svg" alt="Nirantara Logo" />
      </div>
      <ul>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            <Link
              style={{ color: "#6F6B7D", textDecoration: "none" }}
              to={`/${routes[index]}`} 
              onClick={() => handleButtonClick(index)}
            >
              <li
                style={{ display: "flex", alignItems: "center" }}
                className={lc.pathname === routes[index] ? "active" : ""}
              >
                <img
                  src={images[index]}
                  alt="Nirantara Logo"
                  style={{ marginRight: "10px" }}
                />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <>{buttons[index]}</>
                  <span>
                    <img src={arrowright} alt="Arrow Right" />
                  </span>
                </span>
              </li>
            </Link>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
