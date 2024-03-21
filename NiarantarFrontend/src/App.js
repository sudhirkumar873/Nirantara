import Index from "./Route/Index";
import "./App.css";
// import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
function App() {
  const [data, setData] = useState("");

  useEffect(() => { }, []);

  return (
    <div>
      <div className="index" style={{background:'#f9f9f9' ,overflow:'hidden'}} >
        <Index />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
