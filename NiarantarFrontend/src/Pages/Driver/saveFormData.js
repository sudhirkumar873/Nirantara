// Import any necessary dependencies, such as axios or fetch
import axios from "axios";
import { showSuccess } from "../../toast";
const saveFormData = async (formData) => {
  console.log("formData", formData);
  try {
    await axios
      .post("http://localhost:5000/api/addDriver", formData)
      .then((response) => {
        if (response) {
          showSuccess("saved successfully");
          // You can add additional logic here if needed
        } else {
          console.error("Error saving form data:", response.statusText);
        }
      });
  } catch (error) {
    console.error("Error saving form data:", error);
  }
};

export default saveFormData;
