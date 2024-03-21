import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import avatar from "../../utils/Avatar.png";
import LanguageIcon from "@mui/icons-material/Language";
// import { useHistory } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Menu, MenuItem } from "@mui/material";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { highlightWord } from "../utils/hightlight"

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const [word, setSearchTerm] = useState("");

  // const history = useHistory();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Add any additional logout logic here
    // For example, clearing user session or token

    // Navigate to the login page
    // history.push("/login");
    // Navigate("/login")
    // Close the menu
    // Navigate to the login page using useNavigate
    navigate("/");
    handleMenuClose();

  };


  useEffect(()=>{
    const removeHighlight = () => {
      const highlightedSpans = document.querySelectorAll('.highlight');
      highlightedSpans.forEach(span => {
        const text = document.createTextNode(span.innerText);
        span.parentNode.insertBefore(text, span);
        span.parentNode.removeChild(span);
      });
    };
  
  },[])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    highlightWord(e.target.value);
  };




  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{
        marginTop:'20px',
          display: "flex",
          flexDirection: "row",
          padding:'10px 20px',
          justifyContent: "space-between",
          backgroundColor: "#fff ",
          justifyContent: "space-between",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
         
        }}
      >
        <form className="container-fluid" style={{ width: "90%", margin: "0" }}>
          <div className="input-group" style={{ position: "relative" }}>
            <div style={{marginTop:'5px'}}>
              <SearchIcon />
            </div>
            <div style={{width:'90%',
                  outline:'none'}}>
              <input
                onChange={handleSearchChange}
                value={word}
                className="form-control"
                placeholder="Search( Ctrl + / )"
                aria-describedby="basic-addon1"
                style={{
                  paddingLeft: "10px",
                  resize: "none",
                  border: "none",
                  borderRadius: "5px",
                  
                }}
              />
            </div>
          </div>
        </form>
        <LanguageIcon />
        <NotificationsNoneIcon />

        {/* Avatar with dropdown */}
        <div style={{ cursor: "pointer" }} onClick={handleAvatarClick}>
          <Avatar alt="Remy Sharp" src="https://source.unsplash.com//100x100/?user"/>
        </div>

        {/* Avatar dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </nav>
    </div>
  );
};

export default Header;
