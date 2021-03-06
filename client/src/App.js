import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Documentation from "./components/Documentation/Documentation";
import Navbars from "./components/Navbar/Navbars";
import Container from "react-bootstrap/Container";
import { ApiKeyProvider } from "./context/ApiKeyContext";

function App() {
  return (
    <ApiKeyProvider>
      <Navbars />
      <Container className="mt-6">
        <Switch>
          <Route path="/documentation">
            <Documentation />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </ApiKeyProvider>
  );
}

export default App;
