import React from "react";
import { Router, Route, Switch, Link, BrowserRouter  } from "react-router-dom";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import Header from "./Header";
import ImageSearchPage from "./ImageSearchPage";
import LikedImagePage from "./LikedImagePage";
import RemovedImagePage from "./RemovedImagePage";
import ScrollToTopBtn from "./ScrollToTopBtn";
import "./App.scss";

const history = createHistory();

console.log(process.env.REACT_APP_PROJECT_DIR);

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={`/${process.env.REACT_APP_PROJECT_DIR}`} history={history}>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact  component={HomePage} />
            <Route path="/ImageSearchPage" exact component={ImageSearchPage} />
            <Route path="/LikedImagePage" exact component={LikedImagePage} />
            <Route
              path="/RemovedImagePage"
              exact
              component={RemovedImagePage}
            />
          </Switch>
          <ScrollToTopBtn />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
