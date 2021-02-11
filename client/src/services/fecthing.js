import axios from "axios";

export default async function Search(route) {
  try {
    const response = await axios.get(`${route}`);
    return { status: "Success", response: response, message: "Ok" };
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      response: error.response,
      message: error.response.message,
    };
  }
}
