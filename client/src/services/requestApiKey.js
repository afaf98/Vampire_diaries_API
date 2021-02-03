import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default async function requestApiKey(email) {
  console.log("Route", email);
  const response = await axios.post(`${URL}/user`, { body: { email } });
  console.log("Response", response.data);
  return response.data;
}
