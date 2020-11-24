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
import EmployeeModal from "./components/EmployeeModal";
import EmployeeList from "./components/EmployeeList";
import Login from "./components/Login"; //Testing Login layout
import EmployeeLogin from "./components/EmployeeLogin"; // Testing EmployeeLogin layout

// Application screens
import PoolMapping from "./components/PoolMapping";

// Redux testing component
import TestComponent from "./components/TestComponent"; // TESTING PURPOSES

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
            path="/Login"
            render={() => (
              <Container>
                <Login />
              </Container>
            )}
            exact
          />
          <Route
            path="/EmployeeLogin"
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
                <EmployeeModal />
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
            path="/AEMike"
            render={() => <Container>{/* <WellTesting/> */}</Container>}
            exact
          />
          <Route
            path="/Mike"
            render={() => (
              <Container>
                {/* <TestCollection/> */}
                {/* <Results/> */}
              </Container>
            )}
            exact
          />
          <Route
            path="/Roger"
            render={() => (
              <Container>
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
