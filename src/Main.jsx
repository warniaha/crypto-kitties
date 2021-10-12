import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.slim.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

import Test from './Test';
import About from './About';
import Home from './Home';

const Main = () => {
  return (
    <BrowserRouter>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/Test' component={Test}></Route>
        <Route exact path='/About' component={About}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Main;