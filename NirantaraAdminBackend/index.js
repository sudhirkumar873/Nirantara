const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const fuelRoutes = require("./routes/fuelRoutes");
const emmsisionRote = require("./routes/EmissionRoute");
const loationRoute = require("./routes/locationroutes");
const vehicalRoute = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const utilsRoute = require("./routes/utilsRoute");
const newRoleRoute = require("./routes/newroleRoute");
const documentRoute=require("./routes/documentRoutes");
const tripRoute=require("./routes/tripRoutes");
const driverRoute=require("./routes/driverRoutes")
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sudhirkumar7925:xIUtaLjhzuSpdFed@cluster0.mmo1d8b.mongodb.net/nirantara?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      console.log("database connected")
    );
  } catch (error) {
    console.log(error);
  }
};

connectDB();
//Login Routes



// Set up routes
app.use("/api", fuelRoutes);
app.use("/api", emmsisionRote);
app.use("/api", loationRoute);
app.use("/api", vehicalRoute);
// this is the routing in the Rolls and Permissions Page
app.use("/api", userRoutes);
app.use("/api", authRoutes);
// app.use('/api', roleRoutes);

// this is the routing for the Raise Ticket Page
app.use("/api", ticketRoutes);
app.use("/api", utilsRoute);

//this is the routing for the new role user
app.use("/api", newRoleRoute);

//this is the routing for the documentation
app.use("/api", documentRoute);
// app.use("/api", uploadDocRoute);
app.use("/api", tripRoute);

//for driver page
app.use("/api", driverRoute);

// Start the server
app.listen(PORT, (err, res) => {
  if (err) {
    console.log(err);
  } else console.log(`Server is running on port ${PORT}`);
});
