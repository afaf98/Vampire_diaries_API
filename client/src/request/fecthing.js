import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default async function Search() {
  console.log("URL", URL, process.env);
  const response = await axios.get(
    `${URL}/api/seasons?key=534d9e33-f4df-4e3c-af0c-f3ec8abccc36`
  );
  console.log("Response", response.data.seasons);
}
