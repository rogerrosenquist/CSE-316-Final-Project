import { Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <div className="App">
      <AppNavbar />

      <Switch>
        <Route
          path={["/"]}
          render={() => (
            <div>
              <h4>Home page placeholder for component</h4>
            </div>
          )}
          exact
        />
        <Route
          path={["/labtech"]}
          render={() => (
            <div>
              <h4>Labtech page placeholder for a react component</h4>
            </div>
          )}
          exact
        />
        <Route
          path="/employee"
          render={() => (
            <div>
              <h4>Employee page placeholder for a react component</h4>
            </div>
          )}
          exact
        />
        <Route
          path="/"
          render={() => (
            <div>
              <h4>404 Page not found component placeholder</h4>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
