import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Documentation from "./components/Documentation";
import Navbars from "./components/Navbar/Navbars";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <main>
      <Navbars />
      <Container className="mt-6">
        <Switch>
          <Route path="/documentation">
            <Documentation />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </main>
  );
}

export default App;
