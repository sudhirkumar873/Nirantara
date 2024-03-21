import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);

  const getDocumentData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getDocuments");
      if (res.data.success) {
        setData(res.data.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocumentData();
  }, []);

  const toggleStatus = async (e, id) => {
    const status = e.target.checked;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/toggleDocumentStatus/${id}`,
        { status }
      );
      if (response.data.success) {
        getDocumentData();
      }
    } catch (error) {}
  };

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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="table-heading">
            <h2>Documentation</h2>
          </div>
          <Link to="/AddNewDocument">
            <button
              style={{
                width: "180px",
                height: "39px",
                padding: "none",
                color: "black",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "none",
                boxShadow: "0px 4px 8px rgba(0, 0, 0.1, 0.2)",
              }}
            >
              <Typography>+ Add New Document</Typography>
            </button>
          </Link>
        </div>
        <div
          className="table-container"
          style={{ maxHeight: "100%", overflowX: "auto" }}
        >
          <table className="styled-table">
            <thead>
              <tr>
                <th scope="col">Serial No.</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Doc. Type</th>
                <th scope="col">File</th>
                <th scope="col">Uploaded At</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  // key={item._id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <th scope="row">{item.serialNo}</th>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.docType}</td>
                  <td>
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td>{item.createdAt?.slice(0, 10)}</td>

                  <td>
                    {" "}
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          defaultChecked={item.isActive}
                          onChange={(event) => toggleStatus(event, item._id)}
                        />
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

export default Table;
