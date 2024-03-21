import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import ChartComponent from "./ChartComponent";


const Dashboard = () => {
 
  const headerStyle ={
    width:'80%',margin:'auto'
 }
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <div >
        <Sidebar />
      </div>
      <div style={headerStyle}>
        <Header/>
        <ChartComponent/>
      </div>
    </div>
  );
};

export default Dashboard;
