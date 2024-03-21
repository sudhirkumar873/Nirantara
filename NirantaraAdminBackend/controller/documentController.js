const DocumentData = require("../modal/documentModel");

const submitDocument = async (req, res) => {
  try {
    const { serialNo, name, type, docType, upload } = req.body;

    const newDocument = new DocumentData({
      serialNo,
      name,
      type,
      docType,
      file: upload,
    });

    const documentToSend = await newDocument.save();
    return res.json({
      success: true,
      message: "Form Submitted Successfully!",
      data: documentToSend,
    });
  } catch (error) {
    console.error("Error Submitting Form:", error.message);
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await DocumentData.find({}).sort({ createdAt: -1 });
    res.json({ success: true, documents });
  } catch (error) {
    console.error("Error Document uploading", error.message);
    res.status(400).json({ success: false, message: " Internal Error" });
  }
};

const toggleStatus = async (req, res) => {
  const { serialNo } = req.params;
  const updatedData = req.body;

  try {
    let updatedDocument = await DocumentData.findOne({ serialNo });

    if (!updatedDocument) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    // Update the document with the data from req.body
    updatedDocument = await DocumentData.findOneAndUpdate({ serialNo }, updatedData, { new: true });

    // Return the updated document
    return res.json({ success: true, updatedDocument });
  } catch (error) {
    console.error("Error updating document status", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
};



const deleteDocument = async (req, res) => {
  const serialNo = req.params.serialNo; // Extract the serialNo parameter from req.params

  try {
    const deletedDocument = await DocumentData.findOneAndDelete({ serialNo: serialNo });

    if (!deletedDocument) {
      // If no document is deleted, return a 404 status with a corresponding message
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    // Return a success message if the document is deleted successfully
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    // If an error occurs during the deletion process, return a 500 status with an error message
    console.error("Error deleting document", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
};


module.exports = {
  submitDocument,
  getDocuments,
  toggleStatus,
  deleteDocument,
};
