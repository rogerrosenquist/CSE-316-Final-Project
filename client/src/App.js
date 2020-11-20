import { Route, Switch } from "react-router-dom";

import ItemList from "./components/ItemList";
import EmployeeList from "./components/EmployeeList";
import AppNavbar from "./components/AppNavbar";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <Route path={["/test", "/items"]} render={() => <ItemList />} exact />
          {/* <Route
            path={["/employee-list"]}
            render={() => <EmployeeList />}
            exact
          /> */}
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
