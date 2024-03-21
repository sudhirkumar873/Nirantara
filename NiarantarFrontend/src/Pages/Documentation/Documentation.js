// src/UnderConstructionPage.js
import React from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "./Table";



const Documentation = () => {
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <div >
        <Sidebar/>
      </div>
      <div style={{width:"80%" ,margin:'auto'}}>
        <Header />
        <Table/>
      </div>
    </div>
  );
};

export default Documentation;
