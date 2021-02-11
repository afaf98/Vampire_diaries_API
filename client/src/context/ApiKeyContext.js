import { createContext, useState, useContext } from "react";

const ApiKeyContext = createContext({});

export function ApiKeyProvider(props) {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey")); // move it to a dedicated component

  return (
    <ApiKeyContext.Provider value={{ apiKey: apiKey, setApiKey: setApiKey }}>
      {props.children}
    </ApiKeyContext.Provider>
  );
}

export default function useApiKey() {
  return useContext(ApiKeyContext);
}
