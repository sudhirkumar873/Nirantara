import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { showSuccess, showError } from "../../toast";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { retry } from "@aws-amplify/core/internals/utils";

const AddNewDoc = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serialNo: "",
    name: "",
    type: "",
    docType: "",
    file: null,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.serialNo ||
      !formData.name ||
      !formData.type ||
      !formData.docType ||
      !formData.file
    ) {
      showError("Please fill all fields are mandatory");
      return;
    }

    try {
      const formData2 = new FormData();
      formData2.append("serialNo", formData.serialNo);
      formData2.append("name", formData.name);
      formData2.append("type", formData.type);
      formData2.append("docType", formData.docType);
      formData2.append("upload", formData.file);

      const response = await axios.post(
        "http://localhost:5000/submitDocuments",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data saved successfully!");
        navigate("/Documentation");
        // Assuming you are using React Router, replace with your navigation logic
        // import { navigate } from "react-router-dom";
        // navigate("/Documentation");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error during data submission:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ height: "100vh" }}>
        {/* Sidebar component */}
        <Sidebar />
      </div>
      <div style={{ width: "80%", height: "100vh", margin: "auto" }}>
        {/* Header component */}
        <Header />

        {/* Form starts here */}
        <Paper
          elevation={3}
          style={{ padding: "20px", marginTop: "20px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="20%">Document No.</TableCell>
                  <TableCell width="20%">Name</TableCell>
                  <TableCell width="10%">File Type</TableCell>
                  <TableCell width="20%">Doc. Type</TableCell>
                  <TableCell width="30%">File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Your form fields go here */}
                <TableRow>
                  <TableCell>
                    <TextField
                      name="serialNo"
                      placeholder="Serial No."
                      variant="outlined"
                      value={formData.serialNo}
                      onChange={(e) =>
                        handleInputChange("serialNo", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="name"
                      placeholder="Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      name="type"
                      variant="outlined"
                      placeholder="File Type"
                      fullWidth
                      value={formData.type}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
                    >
                      <MenuItem value="image">Image</MenuItem>
                      <MenuItem value="document">Document</MenuItem>
                      <MenuItem value="file">File</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="docType"
                      variant="outlined"
                      placeholder="Doc Type"
                      value={formData.docType}
                      onChange={(e) =>
                        handleInputChange("docType", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="file"
                      name="file"
                      variant="outlined"
                      onChange={(e) =>
                        handleInputChange("file", e.target.files[0])
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Add a submit button if needed */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  textTransform: "none",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
        {/* Form ends here */}
      </div>
    </div>
  );
};

export default AddNewDoc;
