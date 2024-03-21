// Import any necessary dependencies, such as axios or fetch
import { Axios } from "axios";
const saveFormData = async (formData) => {
  console.log("formData", formData);
  try {
    const response = await fetch("http://localhost:5000/api/addlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Form data saved successfully");
      // You can add additional logic here if needed
    } else {
      console.error("Error saving form data:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving form data:", error);
  }
};

export default saveFormData;
