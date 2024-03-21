import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import Modal from "react-modal";
import axios from "axios";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const AccessModel = [
  { title: "Dashboard" },
  { title: "Trips" },
  { title: "Location Master" },
  { title: "Vehicle Master" },
  { title: "Driver Master" },
  { title: "Fuel Master" },
  { title: "CO2 Calculator" },
  { title: "Role & Permission" },
  { title: "Support" },
  { title: "Documentation" },
];
const MultipleSelectCheckbox = () => {
  const [roleFormData, setRoleFormData] = useState({
    roleAccessName: [],
  });

  const handleInputChange = (event) => {
    const selectedModules = event.target.value;
    setRoleFormData((prevFormData) => ({
      ...prevFormData,
      roleAccessName: selectedModules,
    }));
  };
};
const ModuleSelection = ({
  roleFormData,
  setRoleFormData,
  handleInputChange,
}) => {
  const handleChange = (event) => {
    const selectedModules = event.target.value;
    // Assuming roleAccessName is an array in your state
    setRoleFormData((prevFormData) => ({
      ...prevFormData,
      roleAccessName: selectedModules,
    }));
  };
};
const TableBody = ({
  data,
  setviewModalIsOpen,
  setSelectedRowData,
  setisEdit,
}) => (
  <tbody>
    {data.map((row, index) => {
      // Format the addedDate to display only the date without the time
      const formattedDate = new Date(row.addedDate).toLocaleDateString();

      return (
        <>
          <tr
            key={row.userId}
            className={index % 2 === 0 ? "even-row" : "odd-row"}
          >
            <td>{row.userID}</td>
            <td>
              {row.name}
              {"     "}
              <br />
              {row.email}
            </td>
            <td>{row.mobilenumber}</td>
            <td>{row.role}</td>
            <td>{row.name}</td>
            <td>{formattedDate}</td>
            <td
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "26px 0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#4B465C",
                    color: "#fff",
                    textTransform: "none",
                    width: "50px",
                    height: "24px",
                  }}
                  onClick={() => {
                    setSelectedRowData(row);
                    setisEdit(false);
                    setviewModalIsOpen(true);
                  }}
                >
                  view
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  style={{
                    textTransform: "none",
                    width: "50px",
                    height: "24px",
                  }}
                  onClick={() => {
                    setSelectedRowData(row);
                    setisEdit(true);
                    setviewModalIsOpen(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M19.5353 6.80503L15.6948 2.96534C15.5671 2.83763 15.4155 2.73632 15.2487 2.6672C15.0818 2.59808 14.903 2.5625 14.7224 2.5625C14.5418 2.5625 14.363 2.59808 14.1961 2.6672C14.0293 2.73632 13.8777 2.83763 13.75 2.96534L3.15305 13.5623C3.02482 13.6895 2.92315 13.841 2.85396 14.0078C2.78476 14.1747 2.74943 14.3536 2.75001 14.5342V18.3748C2.75001 18.7395 2.89487 19.0892 3.15274 19.3471C3.4106 19.6049 3.76033 19.7498 4.12501 19.7498H18.5625C18.7448 19.7498 18.9197 19.6774 19.0486 19.5484C19.1776 19.4195 19.25 19.2446 19.25 19.0623C19.25 18.88 19.1776 18.7051 19.0486 18.5762C18.9197 18.4472 18.7448 18.3748 18.5625 18.3748H9.91032L19.5353 8.74979C19.663 8.62211 19.7643 8.47051 19.8335 8.30367C19.9026 8.13683 19.9382 7.958 19.9382 7.77741C19.9382 7.59682 19.9026 7.41799 19.8335 7.25115C19.7643 7.0843 19.663 6.93271 19.5353 6.80503ZM7.96555 18.3748H4.12501V14.5342L11.6875 6.97175L15.5281 10.8123L7.96555 18.3748ZM16.5 9.84034L12.6603 5.99979L14.7228 3.93729L18.5625 7.77784L16.5 9.84034Z"
                      fill="#4B465C"
                    />
                  </svg>
                </Button>
              </div>
            </td>
          </tr>
        </>
      );
    })}
  </tbody>
);

const RollsAndPermissionTable = () => {
  const [data, setData] = useState([]);
  const [newdata, setNewData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [roleModalIsOpen, setRoleModalIsOpen] = React.useState(false);
  const [viewModalIsOpen, setviewModalIsOpen] = React.useState(false);
  const [SelectedRowData, setSelectedRowData] = React.useState([]);
  const [isEdit, setisEdit] = React.useState(false);

  const openModal1 = () => {
    setIsModalOpen(true);
  };

  const closeModal1 = () => {
    setIsModalOpen(false);
  };

  const get_data = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log("rollsdata", response);
      const data = response.data;
      setData(data?.reverse());
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    get_data();
  }, [modalIsOpen, roleModalIsOpen, viewModalIsOpen]);

  const get_newroledata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/newrole");
      console.log("newroledata", response);
      setNewData(response.data); // Fix state update
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const [roleFormData, setRoleFormData] = React.useState({
    roleName: "",
    roleAccessName: [],
  });

  const handleAutocompleteChange = (e, value) => {
    setRoleFormData((prevData) => ({
      ...prevData,
      roleAccessName: value,
    }));
  };

  const handleInputChange = (e, formDataSetter) => {
    const { name, value } = e.target;
    console.log(name, value);
    formDataSetter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleupdateInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSelectedRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CreateValidation = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.userRole
    ) {
      toast.error("Please fill All fields is mandatory !");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number
    if (!phoneRegex.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit phone number!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log("formdata", formData);
    const valid = CreateValidation();

    if (valid) {
      try {
        await axios
          .post("http://localhost:5000/api/users", formData)
          .then((res) => {
            if (res) {
              // alert("data added");
              get_data();
              toast.success("User Added!");
              closeModal();
              setFormData({
                name: "",
                email: "",
                mobile: "",
                userRole: "",
              });
            }
          });
      } catch (error) {}
    }
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    console.log(roleFormData);

    try {
      const roleAccessNamesArray = roleFormData.roleAccessName.map(
        (item) => item.title
      );
      const roleAccessNameString = roleAccessNamesArray.join(", ");
      const formDataToSend = {
        ...roleFormData,
        roleAccessName: roleAccessNameString,
      };

      console.log(formDataToSend);
      if (!roleFormData.roleName || roleFormData.roleAccessName.length == 0) {
        toast.error("Please Add a Role And Access Name");
        return;
      }

      const roleResponse = await axios.post(
        "http://localhost:5000/api/newrole",
        formDataToSend
      );
      console.log(roleResponse);
      toast.success("Role Added !");
      get_newroledata();
      closeRoleModal();
      setRoleFormData({
        roleName: "", // assuming roleName is a string
        roleAccessName: [], // assuming roleAccessName is an array
      });
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    get_newroledata();
  }, []);

  // const tableData = generateRandomData();

  function openModal() {
    setIsOpen(true);
    get_newroledata();
  }

  function closeModal() {
    setIsOpen(false);
  }

  const openRoleModal = () => {
    setRoleModalIsOpen(true);
  };

  const closeRoleModal = () => {
    setRoleModalIsOpen(false);
  };
  const generateRandomUserID = () => {
    return Math.floor(Math.random() * 9000) + 1000; // Generates a random four-digit number
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = React.useState({
    userID: generateRandomUserID(),
    name: "",
    email: "",
    mobile: "",
    userRole: "",
    addedDate: getCurrentDate(),
  });

  const customStyles = {
    overlay: {
      // backgroundColor: "rgba(255, 255, 255,  1)", // Fully opaque white
      color: "black", // Black background with 70% opacity
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      width: "440px",
      backgroundColor: "white", // Transparent to allow the nested Paper to control background
      border: "none", // Remove border to give a clean look
      color: "black",
    },
  };

  const handleupdate = async () => {
    console.log(SelectedRowData);

    try {
      const roleResponse = await axios.put(
        `http://localhost:5000/api/updateuser/${SelectedRowData.userID}`,
        SelectedRowData
      );
      setviewModalIsOpen(false);
      console.log(roleResponse);
      closeModal();
      toast.success("Updated !");
      // get_newroledata();
    } catch (error) {
      console.error("Axios Error:", error);
    }
    closeRoleModal();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "1%",
        }}
      >
        <div className="table-heading">
          <Typography variant="h5">All Users</Typography>
        </div>
        <div
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={openModal}
            style={{
              padding: "6px 16px",
              color: "black",
              backgroundColor: "white",

              border: "none",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0.1, 0.2)",
            }}
          >
            + New User
          </Button>
          <Button
            onClick={openRoleModal}
            style={{
              padding: "6px 16px",
              color: "black",
              backgroundColor: "white",

              textTransform: "none",
              border: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0.1, 0.2)",
            }}
          >
            + New Role Type
          </Button>
        </div>
      </div>
      <div style={{ backgroundColor: "#fff" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        ></div>
        <div className="tableWapper">
          <table className="styled-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name with Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created By</th>
                <th>Date</th>
                <th style={{ textAlign: "center", zIndex: "999" }}></th>
              </tr>
            </thead>
            <TableBody
              data={data}
              setviewModalIsOpen={setviewModalIsOpen}
              setSelectedRowData={setSelectedRowData}
              setisEdit={setisEdit}
            />
          </table>
        </div>

        {/* Modal for the first button on the top of the table */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Grid>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Lora",
                fontWeight: "400",
                fontSize: "24px",
                lineHeight: "32px",
                marginBottom: "3%",
              }}
            >
              Create User
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Lora",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                marginBottom: "5%",
              }}
            >
              Complete the Form to Personalize Your Experience
            </Typography>
          </Grid>
          <form>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, setFormData)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, setFormData)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange(e, setFormData)}
              fullWidth
              margin="normal"
            />
            <br />
            <br />

            {/* <div >
                <label htmlFor="fuelType">Measurement Type</label><br />
                <FormControl style={{ width: "300px", height: '39px' }}>

                  <Select
                    id="measurementType"
                    value={selectedMeasurement}
                    onChange={(e) => handleMeasurementSelect(e.target.value)}
                    required
                  >
                    {measurementData.map((measurement, index) => (
                      <MenuItem key={index} value={measurement}>
                        {measurement}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
            <FormControl fullWidth>
              <InputLabel id="userRole">Role</InputLabel>
              <Select
                labelId="userRole"
                className="rolesSelect"
                value={formData.userRole}
                name="userRole"
                label="Age"
                onChange={(e) => handleInputChange(e, setFormData)}
              >
                {newdata.map((item, idx) => (
                  <MenuItem
                    style={{ height: "auto" }}
                    key={idx}
                    value={item.roleName}
                  >
                    {item.roleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  marginTop: "5%",
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
        {/* Modal for the Second button on the top of the table */}
        <Modal
          isOpen={roleModalIsOpen}
          onRequestClose={closeRoleModal}
          style={customStyles}
          contentLabel="Role Modal"
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Lora",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "32px",
              marginBottom: "3%",
            }}
          >
            Create New Role
          </Typography>
          <Typography
            variant="h7"
            sx={{
              fontFamily: "Lora",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
              marginBottom: "5%",
            }}
          >
            Empower Your Team: Create a New User Role
          </Typography>
          <form>
            <TextField
              label="Role Name"
              name="roleName"
              value={roleFormData.roleName}
              onChange={(e) => handleInputChange(e, setRoleFormData)}
              fullWidth
              margin="normal"
            />
            <Autocomplete
              multiple
              // id="checkboxes-tags-demo"

              options={AccessModel}
              disableCloseOnSelect
              value={roleFormData.roleAccessName}
              onChange={handleAutocompleteChange}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Access Name Module"
                  // placeholder="Favorites"
                />
              )}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <Button
                onClick={handleRoleSubmit}
                variant="contained"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  width: "100%",
                  padding: "15px",
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal for the viewe button  */}
        <Modal
          isOpen={viewModalIsOpen}
          onRequestClose={() => setviewModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Grid>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Lora",
                fontWeight: "400",
                fontSize: "24px",
                lineHeight: "32px",
                marginBottom: "3%",
              }}
            >
              {isEdit ? "Edit" : "View"} Roles and Permission
            </Typography>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Lora",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                marginBottom: "5%",
              }}
            >
              Lörem ipsum diasion multibons, och hide pasesa iling.
              <br /> Lorem Grindsamhälle lanar, hässa. Spegon ultravis.
            </Typography>
          </Grid>
          <form>
            <TextField
              label="User ID"
              name="userID"
              value={SelectedRowData.userID}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={SelectedRowData.name}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={SelectedRowData.email}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              name="text"
              value={SelectedRowData.role}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            />
            {/* <TextField
              label="Created By"
              name="name"
              value={SelectedRowData.name}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            /> */}
            <TextField
              label="created At"
              name="addedDate"
              value={new Date(SelectedRowData.addedDate).toLocaleDateString()}
              onChange={handleupdateInputChange}
              fullWidth
              margin="normal"
            />

            {isEdit && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={handleupdate}
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default RollsAndPermissionTable;
