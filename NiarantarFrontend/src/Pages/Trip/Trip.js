import React, { useState } from "react";
import { Typography, Paper, IconButton } from "@mui/material";
// import ConstructionIcon from "@mui/icons-material/Construction";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import TripTable from "./TripTable";

const spinAnimation = (theme) => ({
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(-360deg)",
    },
  },
  padding: "2rem",
  textAlign: "center",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  animation: "$spin 2s linear infinite", // Apply the spin animation
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const AnimatedPaper = styled(Paper)(spinAnimation);

const BackButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
});

const Trip = () => {
    // Add logic to navigate back to the previous page
    // window.history.back();
    const [data, setData] = useState([]);
    const containerStyle = {
      display: "flex",
    };

  
    const tableStyle = {
      width: "80%",margin:'auto'
    };

    const headerstyle = {
      width: "100%",
    };
  
  return (
    <div style={containerStyle}>
      <div >
        <Sidebar />
      </div>

      <div style={tableStyle}>
        <div style={headerstyle}>
          <Header />
        </div>
        
        <TripTable data={data} />
      </div>
    </div>
  );
};

export default Trip;
