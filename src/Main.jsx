import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Factory from './pages/Factory';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import KittiesNavBar from './KittiesNavBar'
import { KittiesContext } from './KittiesContext';
import { abi } from './abi.js';

const Web3 = require("web3");
const contractAddress = "0xde77dcE0EB73E79a7ecd5B430Ea3d0B5D6FdbBd1";

const Main = () => {
  const [value, setValue] = React.useState("Hello from useState/useContext");
  const [accounts, setAccounts] = React.useState();
  const [kittyContractInstance, setKittyContractInstance] = React.useState();

  if (accounts === undefined){
    window.ethereum.enable().then(accts => {
      console.log(`Accounts: ${accts}`)
      setAccounts(accts);
      var web3 = new Web3(Web3.givenProvider);
      const instance = new web3.eth.Contract(abi, contractAddress, { from: accts[0] });
      console.log(`kittyContractInstance: ${instance}`)
      setKittyContractInstance(instance);
      instance.events.Birth().on('data', function(event){
          console.log(event);
          // alert(`Kitty creation successful for ID: ${event.returnValues.kittyId}`)
      });
    });
  }
  
  // console.log(JSON.stringify(store));
  return (
    <BrowserRouter>
      <KittiesNavBar/>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <KittiesContext.Provider value={{ value, setValue, accounts, kittyContractInstance }}>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Factory' component={Factory}></Route>
          <Route exact path='/Catalog' component={Catalog}></Route>
        </KittiesContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Main;