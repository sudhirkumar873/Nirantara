import React, { useEffect, useState } from "react";
// import awsConfig from "./aws-exports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Typography,
  Paper,
  // IconButton,
  TextField,
  Button,
  Grid,
  Avatar,
  Container,
} from "@mui/material";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
// import DescriptionIcon from "@mui/icons-material/Description";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import AvatrImg from "../../utils/Random.png";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import vectorimage from "../../utils/Vector.png";
import "./SupportPage.css";
import axios from "axios";
// import Ticket from "../../../../app-backend/modal/ticketModel";

const SupportPage = () => {
  // const history = useHistory();
  const [dragging, setDragging] = useState(false);
  const [gridColor, setGridColor] = useState("#ffffff");
  const [activeButtonClicked, setActiveButtonClicked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [closedButtonClicked, setClosedButtonClicked] = useState(false);
  const [ticket, setTicket] = useState([]);
  const [expandedStates, setExpandedStates] = useState(
    ticket ? Array(ticket.length).fill(false) : []
  );

  const [refreshData, setRefreshData] = useState(false);
  const [msg, setMsg] = useState("");
  const [inputData, setInputdata] = useState({
    title: "",
    category: "",
    description: "",
    upload: "",
  });
  const generateRandom4DigitNumber = () => {
    return `ST${Math.floor(Math.random() * 900) + 101}`;
  };

  const [supportid, setsupportID] = useState(generateRandom4DigitNumber());
  // const { title, category, description, upload } = inputData;

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    // Handle the dropped files, you can perform file validation, upload, etc.
    console.log("Dragged file here");
    console.log(files);
    setImage(files[0]);
  };

  const goBack = () => {
    // Add logic to navigate back to the previous page
    window.history.back();
  };

  // For the first box
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = (index) => {
    const updatedTicket = [...ticket];
    updatedTicket[index].expanded = !updatedTicket[index].expanded;
    // setTicket(() => [...updatedTicket].reverse());
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setInputdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Form Submitted", { name: value });
  };

  const handleExpandClick2 = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);

    const isActive = newExpandedStates.some((state) => !state);

    if (isActive) {
      setActiveButtonClicked(true);
      setClosedButtonClicked(false);
    } else {
      setActiveButtonClicked(false);
      setClosedButtonClicked(true);
    }
  };

  const handleActiveButtonClick = () => {
    const newExpandedStates = expandedStates.map(() => false);
    setExpandedStates(newExpandedStates);
    setActiveButtonClicked(true);
    setClosedButtonClicked(false);
  };
  const handleClosedButtonClick = () => {
    const newExpandedStates = expandedStates.map(() => true);
    setExpandedStates(newExpandedStates);
    setActiveButtonClicked(false);
    setClosedButtonClicked(true);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const containerStyle = {
    display: "flex",
  };

  const PageStyle = {
    width: "80%",
    margin: " auto",
  };

  const tickets = async () =>
    await axios.get("http://localhost:5000/api/getTickets");

  useEffect(() => {
    try {
      tickets().then((res) => {
        const updatedTickets = res.data.tickets.map((item) => ({
          ...item,
          expanded: true,
        }));
        // console.log(updatedTickets);
        const ans = updatedTickets.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setExpandedStates(ans ? Array(ans.length).fill(true) : []);
        setTicket(ans);
        setMsg("");
      });
    } catch (error) {
      console.log(error);
    }
  }, [msg]);

  const [image, setImage] = useState();

  // console.log("mes", msg);

  const submitFormToAPI = async (formData) => {
    return await axios.post(
      "http://localhost:5000/api/submitTicket",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(supportid);
      console.log(inputData.description);
      console.log(inputData.category);
      if (!inputData.description || !inputData.category) {
        toast.error("Please fill the all fields");
        return;
      }

      console.log(inputData.description);
      console.log(inputData.category);
      console.log(image);

      const formData = new FormData();
      formData.append("title", supportid);
      formData.append("category", inputData.category);
      formData.append("description", inputData.description);
      formData.append("upload", image);
      // console.log("formData",formData)
      const response = await submitFormToAPI(formData);

      setTicket((prevTickets) => [
        ...prevTickets,
        { ...response.data, expanded: true },
      ]);

      console.log("Before setInputdata", inputData);
      // setInputdata((prev) => ({
      //   ...prev,
      //   title: "",
      //   category: "",
      //   description: "",
      //   upload: "",
      // }));

      // setImage((prevImage) => null);

      console.log("After setInputdata", inputData);
      toast.success("Form Submitted!");
      setMsg("Data updated");

      console.log(response.data);
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleBrowseClick = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={{ height: "100vh" }}>
          <Sidebar />
        </div>
        <div style={PageStyle}>
          <Header />
          <div>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Lora",
                fontWeight: "750px",
                fontSize: "36px",
                marginTop: "-10px",
              }}
            >
              Support Tickets
            </Typography>
            <br />
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#fff",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <Grid sx={{ display: "flex" }}>
                  <Grid>
                    <Button
                      sx={{
                        fontFamily: "Lora",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        textTransform: "none",
                        color: activeButtonClicked ? "#4F8BFF" : "black",
                      }}
                      onClick={handleActiveButtonClick}
                    >
                      Active
                    </Button>
                    <Button
                      sx={{
                        fontFamily: "Lora",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        textTransform: "none",
                        color: closedButtonClicked ? "#4F8BFF" : "black",
                      }}
                      onClick={handleClosedButtonClick}
                    >
                      Closed
                    </Button>
                  </Grid>
                </Grid>
                <div style={{ overflowY: "auto", height: "530px" }}>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    {/* Paper 1 */}

                    {/* {const ans = ticket.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));} */}
                    {ticket?.map((item, index) => (
                      <Paper
                        key={index}
                        elevation={3}
                        sx={{
                          margin: "10px",
                          padding: "16px",
                          backgroundColor: expandedStates[index]
                            ? "inherit"
                            : "rgba(223, 237, 209, 0.2)",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <Grid>
                          <div className="titleticket">
                            <div>
                              <b></b>
                            </div>
                            <div onClick={() => handleExpandClick2(index)}>
                              {expandedStates[index] ? (
                                <ExpandCircleDownIcon />
                              ) : (
                                <ExpandLessIcon
                                  sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "55%",
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              )}
                            </div>
                          </div>

                          <Grid className="categorysection">
                            <div style={{ fontSize: "14px", color: "#333" }}>
                              {expandedStates[index] ? (
                                <>
                                  <div style={{ background: "" }}>
                                    <div className="df jsb">
                                      <div
                                        style={{
                                          width: "200px",
                                          height: "100px",
                                        }}
                                      >
                                        <img
                                          src={item.upload}
                                          alt="Uploaded Image"
                                          style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "contain", // Ensures the image covers the entire container
                                          }}
                                        />
                                      </div>

                                      <div
                                        style={{
                                          width: "100%",
                                          padding: "8px",
                                        }}
                                      >
                                        <b>{item.title}</b>
                                        <div
                                          style={{
                                            fontWeight: "500",
                                            color: "#333",
                                          }}
                                          className="categoryheading"
                                        >
                                          {item.category}
                                        </div>
                                        {item.description}
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                </>
                              ) : (
                                // Display a truncated version of the text
                                <>
                                  <b>{item.title}</b>
                                  <div
                                    style={{ fontWeight: "500", color: "#333" }}
                                    className="categoryheading"
                                  >
                                    {item.category}
                                  </div>
                                  {item.description}
                                  <br />
                                  <span style={{ cursor: "pointer" }}>
                                    {/* <b>Resolution</b>
                                      <br />
                                      {item.description} */}
                                    <div>
                                      <img
                                        src={item.upload}
                                        style={{
                                          height: "100%",
                                          width: "100%",
                                          padding: "8px",
                                          borderRadius: "8px",
                                        }}
                                      />
                                    </div>
                                  </span>
                                </>
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Grid>
                </div>
              </Grid>
              {/* This is for the Ticket Form */}
              <Grid>
                <Container
                  maxWidth="mds"
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    padding: "none",
                  }}
                >
                  <Grid
                    // elevation={1}
                    style={{
                      padding: 20,
                      marginTop: 10,
                      width: "450px",
                      height: "552px",
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div className="Form-content">
                              <Grid
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginBottom: 5,
                                }}
                              >
                                <div>
                                  <Avatar>
                                    <img
                                      style={{ height: "100%", width: "100%" }}
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/avatarimg.png"
                                      }
                                    />
                                  </Avatar>
                                </div>
                                <div
                                  style={{ marginTop: "2%", marginLeft: "2%" }}
                                >
                                  <b>Raise a Ticket</b>
                                </div>
                              </Grid>
                              <Grid
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  //
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",

                                    // border: "1px solid black",
                                  }}
                                >
                                  <div>
                                    <label>Ticket I'd</label>
                                  </div>
                                  <div>
                                    <TextField
                                      style={{ width: "90%" }}
                                      name="title"
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                      disabled
                                      value={supportid}
                                      onChange={handelChange}
                                    />
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div>
                                    <label>Category</label>
                                  </div>
                                  <div>
                                    <TextField
                                      name="category"
                                      fullWidth
                                      margin="normal"
                                      variant="outlined"
                                      onChange={handelChange}
                                    />
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div>
                                  <label>Description</label>
                                </div>
                                <div>
                                  <TextField
                                    // label="Type Here..."
                                    name="description"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handelChange}
                                  />
                                </div>
                              </Grid>
                              <div
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{
                                  borderRadius: "10px",
                                }}
                              >
                                <label>Upload</label>

                                <div className="file-upload-area">
                                  <p>
                                    {image?.name || "Drag and drop or"}
                                    &nbsp;
                                    <button
                                      className="uploadBrowse"
                                      onClick={(e) => handleBrowseClick(e)}
                                    >
                                      browse
                                    </button>
                                    <input
                                      type="file"
                                      id="fileInput"
                                      name="upload"
                                      onChange={handleFileChange}
                                      style={{
                                        opacity: "0",
                                        width: "0.1px",
                                        height: "0.1px",
                                        overflow: "hidden",
                                        position: "absolute",
                                      }}
                                    />
                                  </p>
                                </div>

                                {/* Uploaded Image */}
                                {uploadedImage && (
                                  <div style={{ marginTop: "20px" }}>
                                    <img
                                      src={uploadedImage}
                                      alt="Uploaded"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: 20,
                                }}
                              >
                                <Button
                                  type="submit"
                                  style={{
                                    color: "#fff",
                                    width: "100%",
                                    backgroundColor: "black",
                                    textTransform: "none",
                                    padding: "10px",
                                  }}
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Container>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SupportPage;
