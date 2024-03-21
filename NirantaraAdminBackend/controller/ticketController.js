// ticketController.js
const Ticket = require("../modal/ticketModel");
const fileUploadController = require("./utilsController");

// Function to handle submitting a ticket
const submitTicket = async (req, res) => {
  console.log("main funcrion");
  try {
    const { title, category, description, upload } = req.body;

    // Create a new Ticket object using the Mongoose model
    const newTicket = new Ticket({ title, category, description, upload });

    // Save the ticket to MongoDB
    const dataToSend = await newTicket.save();

    // Respond with success
    return res.json({
      success: true,
      message: "Form submitted successfully!",
      data: dataToSend,
    });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to handle retrieving ticket data
const getTickets = async (req, res) => {
  try {
    // Retrieve tickets from MongoDB using the Mongoose model
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });

    // Respond with the retrieved tickets
    return res.json({ success: true, tickets });
  } catch (error) {
    console.error("Error retrieving tickets:", error.message);
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to handle updating a ticket
const updateTicket = async (req, res) => {
  try {
    // const { } = req.params;
    const { title ,category, description, upload } = req.body;

    // Find the ticket by title
    let ticket = await Ticket.findOne({ title });

    // If ticket not found, return error
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    // console.log(ticket);
    // Update ticket data with new values
    if (category) ticket.category = category;
    if (description) ticket.description = description;
    if (upload) ticket.upload = upload;

    // Save the updated ticket
    ticket = await ticket.save();

    // Return the updated ticket
    return res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


// Function to handle deleting a ticket
const deleteTicket = async (req, res) => {
  try {
    const { title } = req.params;
    // Find the ticket by title and delete it
    const deletedTicket = await Ticket.findOneAndDelete({ title });
    // If ticket not found, return error
    if (!deletedTicket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    // Return the deleted ticket
    return res.json({
      success: true,
      message: "Ticket deleted successfully",
      deletedTicket,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};





module.exports = {
  submitTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};
