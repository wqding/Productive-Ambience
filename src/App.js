import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from "./components/landing.js"

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path={"/"} component={Landing}/>
        {/* <Route path={"/upld"} component={Uploader}/>
        <Route path={"/fav"} component={FavouriteRecipes}/> */}
      </Router>
    </div>
  );
}

export default App;

