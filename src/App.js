import React from "react";  
import { Router, Route, Switch, Link } from "react-router-dom";  
import HomePage from "./HomePage";  
import { createBrowserHistory as createHistory } from "history";  
import Header from "./Header";  
import ImageSearchPage from "./ImageSearchPage";  
import LikedImagePage from "./LikedImagePage";
import RemovedImagePage from "./RemovedImagePage";
import "./App.css";  

const history = createHistory();

function App() {  
  return (  
    <div className="App">  
      <Router history={history}>  
        <Header />  
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomePage} />  
            <Route path="/ImageSearchPage" exact component={ImageSearchPage} />
            <Route path="/LikedImagePage" exact component={LikedImagePage} />  
            <Route path="/RemovedImagePage" exact component={RemovedImagePage} />  
          </Switch>
        </div>
        
      </Router>  
    </div>  
  );  
}

export default App;