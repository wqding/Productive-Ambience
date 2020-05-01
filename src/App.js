import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigContextProvider } from './ConfigContext.js'

import Landing from "./components/Landing.js"

const App = () => {
  return (
    <ConfigContextProvider>
      <Router>
        <Route path='/' component={Landing}/>
      </Router>
    </ConfigContextProvider>
  );
}

export default App;

