import React from "react";

import { Route, Switch } from "react-router-dom";

import ItemModal from "./components/ItemModal";
import ItemList from "./components/ItemList";
import EmployeeModal from "./components/EmployeeModal";
import EmployeeList from "./components/EmployeeList";
import AppNavbar from "./components/AppNavbar";

import { Provider } from "react-redux";
import store from "./store";

import { Container } from "reactstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PoolMapping from "./components/PoolMapping";

function App() {
  return (
    <Provider store={store}>
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
                <EmployeeModal />
                <EmployeeList />
              </Container>
            )}
            exact
          />
          <Route
            path="/test1"
            render={() => (
              <PoolMapping/>
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
