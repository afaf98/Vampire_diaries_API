import { useState, useEffect } from "react";
import Search from "../services/fecthing";

export default function useSearch({ url }) {
  const [searchResult, setSearchResult] = useState({
    status: "Idle",
    statusCode: null,
    message: "",
    data: null,
  });
  useEffect(() => {
    setSearchResult({
      status: "Loading",
      statusCode: null,
      message: "Loading",
      data: null,
    });

    async function get() {
      const { response, status } = await Search(url);
      console.log("Search", response, response.statusText);
      setSearchResult({
        status: status,
        statusCode: response.status,
        message: response.statusText,
        data: response.data,
      });
    }

    get();
  }, [url]);

  return searchResult;
}
