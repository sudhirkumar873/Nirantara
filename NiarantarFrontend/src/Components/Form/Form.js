import React, { useEffect, useState } from "react";
// import {BsFillShieldLockFill} from "react-icons/bs"
import styled from "styled-components";
import axios from "axios";
import nirantaraposter from "../../utils/nirantaralogo.png";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/material.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button, TextField } from "@mui/material";
import { BsFillShieldLockFill } from "react-icons/bs";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import OtpInput from "otp-input-react"
// import Sidebar from "../Sidebar/Sidebar";

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column; /* Change the direction on smaller screens */

  @media (min-width: 900px) {
    flex-direction: row; /* Revert to the original direction on larger screens */
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NirantaraContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (mobileNumber.trim().length < 10) {
        toast.error("Please Enter a Valid Mobile Number ");
        return;
      }

      if (
        mobileNumber.trim() !== "" &&
        otp.trim() !== "" &&
        !isNaN(mobileNumber) &&
        !isNaN(otp)
      ) {
        console.log("Logging in with:", { mobileNumber, otp });

        const response = await axios.post("http://localhost:5000/api/login", {
          mobilenumber: mobileNumber,
          userID: otp,
        });

        console.log(response.data.message);
        console.log(response.data.message);

        if (response.status == 200) {
          localStorage.setItem("token", response.data.accessToken);
          toast.success("Login success");
          console.log(response.data);

          const accessPages = response.data.roles?.roleAccessName;
          localStorage.setItem("access", accessPages);

          navigate("/Dashboard");
        } else if (response.status == 400) {
          toast.error("Login Failed. Please check your credentials.");
        } else {
          toast.error("An unexpected error occurred during login.");
        }
      } else {
        toast.error("Only non-empty numbers are allowed as input");
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setIsFormValid(!!mobileNumber && !!otp);
  }, [mobileNumber, otp]);

  return (
    <LoginPageContainer>
      <NirantaraContainer style={{ backgroundColor: "#DFEDD1" }}>
        {/* Add your Nirantara poster here */}
        <img
          src="/logo.svg"
          style={{ height: "70px", width: "200px" }}
          alt="Nirantara Poster"
        />
      </NirantaraContainer>

      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2 style={{ marginTop: "5%" }}>Account Login</h2>
          <h6 style={{ color: "#696F79" }}>
            Login with your registered mobile number
          </h6>
          <label
            htmlFor="mobileNumber"
            style={{ color: "#696F79", marginTop: "7%" }}
          >
            Mobile Number
          </label>
          <br />
          <TextField
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
            type="Number"
            id="mobileNumber"
            placeholder="Enter Your Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <br />
          <label htmlFor="otp" style={{ color: "#696F79" }}>
            OTP
          </label>
          <br />
          <TextField
            style={{
              marginTop: "10px",
              marginBottom: "50px",
              width: "100%",
              boxSizing: "border-box",
            }}
            type="Number"
            placeholder="Enter the OTP"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <br />
          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
            }}
            disabled={!isFormValid}
            onClick={handleLogin}
          >
            Login
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
              marginTop: "5px",
            }}
          >
            <Button>Send OTP</Button>
          </div>
        </LoginForm>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
