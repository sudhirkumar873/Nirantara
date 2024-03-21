// Import any necessary dependencies, such as axios or fetch
import axios from "axios";
const saveFormData = async (formData) => {
  console.log("formData", formData);
  try {
    // const response = await fetch("http://localhost:5000/api/addfuels", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    await axios
      .post("http://localhost:5000/api/users", formData)
      .then((response) => {
        if (response) {
          console.log("Form data saved successfully");
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
