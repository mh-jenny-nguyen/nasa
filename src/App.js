import React from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/Home";
import { createBrowserHistory as createHistory } from "history";
import ImageSearchPage from "./pages/Search";
import LikedImagePage from "./pages/Liked";
import RemovedImagePage from "./pages/Removed";
import NotFoundPage from './pages/NotFound';
import EditPage from "./pages/Edit";
import Layout from "./layouts/standard";

const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router
        basename={`/${process.env.REACT_APP_PROJECT_DIR}`}
        history={history}
      >
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/ImageSearchPage" exact component={ImageSearchPage} />
            <Route path="/LikedImagePage" exact component={LikedImagePage} />
            <Route
              path="/RemovedImagePage"
              exact
              component={RemovedImagePage}
            />
            <Route exact path="/EditPage/:cardid" component={EditPage} />
            <Route component={ NotFoundPage } />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
