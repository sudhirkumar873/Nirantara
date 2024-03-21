import React from "react";
import { Route, Routes ,Navigate} from "react-router-dom";
import Login from "../Pages/LoginPage/Login";
import LocationMaster from "../Pages/LocationMaster/LocationMaster";
import AddNewLocation from "../Pages/LocationMaster/AddNewLocation";
import FuelMaster from "../Pages/FuelMaster/FuelMaster";
import AddNewFuelType from "../Pages/FuelMaster/AddNewFuelType";
import VehicleMaster from "../Pages/VehicleMaster/VehicleMaster";
import AddNewVehicleMaster from "../Pages/VehicleMaster/AddNewVehicleMaster";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Trip from "../Pages/Trip/Trip";
import CO2Calculator from "../Pages/CO2Calculator/CO2Calculator";
import RollsandPermissions from "../Pages/RollsAndPermissions/RollsandPermissions";
import SupportPage from "../Pages/Support/SupportPage";
import Documentation from "../Pages/Documentation/Documentation";
import AddNewDoc from "../Pages/Documentation/AddNewDoc";
import AddNewTrip from "../Pages/Trip/AddNewTrip";
import DriverMaster from "../Pages/Driver/DriverMaster";
import AddNewDriverMaster from "../Pages/Driver/AddNewDriverMaster";

const ProtectedRoute = ({ element, ...rest }) => {
  const isTokenAvailable = !!localStorage.getItem("token");
  return isTokenAvailable ? element : <Navigate to="/login" />;
};


const Index = () => {
  return (
    <div>
      {/* Here, the Routing of the complete pages have been done */}
      <Routes>
        {/* Routing of the Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Routing of the Location Master Page */}
        <Route path="/LocationMaster" element={ <ProtectedRoute element={ <LocationMaster />} />}></Route>
        <Route path="/AddNewLocationMaster" element={ <ProtectedRoute element={ <AddNewLocation />} />} />
        {/* Routing of the Fuel Master Page */}
        <Route path="/fuelmaster" element={ <ProtectedRoute element={ <FuelMaster />} />} />
        <Route path="/AddNewFuelType" element={<AddNewFuelType />} />
        {/* Routing of the Vehicle Master Page */}
        <Route path="/VehicleMaster" element={ <ProtectedRoute element={ <VehicleMaster />} />} />
        <Route path="/AddNewVehicleMaster" element={<AddNewVehicleMaster />} />
        {/* driver */}
        <Route path="/DriverMaster" element={<DriverMaster />}/>
        <Route path="/AddNewDriverMaster" element={<AddNewDriverMaster />}/>
         {/* Routing of the Dashbaord Page*/}
        <Route path="/Dashboard" element={ <ProtectedRoute element={<Dashboard />} /> } />
        {/* Routing of the Trip Page */}
        <Route path="/trips" element={ <ProtectedRoute element={ <Trip />} />} />
        <Route path="/AddNewTrip" element={<AddNewTrip/>} />
        {/* Routing of the CO2Page */}
        <Route path="/co2calculatorpage" element={<CO2Calculator />} />
        {/* Routing of the Rolls and Permission */}
        <Route path="/rollsandpermission" element={ <ProtectedRoute element={ <RollsandPermissions />} />}/>
        {/* Routing of the Support Page */}
        <Route path="/SupportPage" element={ <ProtectedRoute element={ <SupportPage />} />} />
        {/* Routing of the Documentation Page */}
        <Route path="/Documentation" element={<Documentation />} />
        <Route path="/AddNewDocument" element={<AddNewDoc />} />
      </Routes>
    </div>
  );
};

export default Index;
