import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default async function requestApiKey(email) {
  try {
    const response = await axios.post(`${URL}/user`, email);
    console.log("Respo", response);
    return { message: response.data.message, success: true };
  } catch (error) {
    console.error("Error", error.response.data);
    return { message: error.response.data.message, success: false };
  }
}
