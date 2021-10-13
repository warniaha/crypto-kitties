import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.slim.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import KittiesNavBar from './KittiesNavBar'

import Factory from './pages/Factory';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import { UserContext } from './UserContext';

const Main = () => {
  const [value, setValue] = React.useState("Hello from useState/useContext");
  return (
    <BrowserRouter>
    <KittiesNavBar/>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <UserContext.Provider value={{ value, setValue }}>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Factory' component={Factory}></Route>
          <Route exact path='/Catalog' component={Catalog}></Route>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Main;