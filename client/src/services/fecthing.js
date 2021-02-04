import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default async function Search(route) {
  try {
    const response = await axios.get(`${route}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
