import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "reactstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal"; // TESTING PURPOSES
import ItemList from "./components/ItemList"; // TESTING PURPOSES
import EmployeeList from "./components/EmployeeList";

// Application screens
import PoolMapping from "./components/PoolMapping";
import Results from "./components/Results.js";
import TestCollection from "./components/TestCollection.js";
import WellTesting from "./components/WellTesting.js";
import Login from "./components/Login";
import EmployeeLogin from "./components/EmployeeLogin";
import LabHome from "./components/LabHome";

// Redux testing component
import TestComponent from "./components/TestComponent"; // TESTING PURPOSES

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />

        <Switch>
          <Route
            path={["/", "/labtech"]}
            render={() => (
              <Container>
                <Login />
              </Container>
            )}
            exact
          />
          <Route
            path="/employee"
            render={() => (
              <Container>
                <EmployeeLogin />
              </Container>
            )}
            exact
          />
          <Route
            path={["/test", "/items"]}
            render={() => (
              <Container>
                <ItemModal />
                <ItemList />
              </Container>
            )}
            exact
          />
          <Route
            path={["/employee-list"]}
            render={() => (
              <Container>
                <EmployeeList />
              </Container>
            )}
            exact
          />
          <Route path="/PoolMapping" render={() => <PoolMapping />} exact />
          <Route
            path="/Zhen"
            render={() => (
              <Container>
                <TestComponent />
              </Container>
            )}
            exact
          />
          <Route
            path="/WellTesting"
            render={() => (
              <Container>
                <WellTesting />
              </Container>
            )}
            exact
          />
          <Route
            path="/TestCollection"
            render={() => (
              <Container>
                <TestCollection />
              </Container>
            )}
            exact
          />
          <Route
            path="/Results"
            render={() => (
              <Container>
                <Results />
              </Container>
            )}
            exact
          />
          <Route
            path="/LabHome"
            render={() => (
              <Container>
                <LabHome />
              </Container>
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
    </Provider>
  );
}

export default App;
