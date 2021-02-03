import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default async function requestApiKey(email) {
  try {
    const response = await axios.post(`${URL}/user`, email);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
