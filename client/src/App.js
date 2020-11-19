import { Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <h1>hello</h1>

      <Switch>
        <Route
          path={["/", "/labtech"]}
          render={() => {
            <div>
              <h1>Labtech page placeholder</h1>
              <h2>Placeholder for a react component</h2>
              <p>Enclose this section with '()' for a react component</p>
            </div>;
          }}
          exact
        />
        <Route
          path="/employee"
          render={() => {
            <div>
              <h1>Employee page placeholder</h1>
              <h2>Placeholder for a react component</h2>
              <p>Enclose this section with '()' for a react component</p>
            </div>;
          }}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;
