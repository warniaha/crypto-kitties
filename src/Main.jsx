import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Factory from './pages/Factory';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import KittiesNavBar from './KittiesNavBar'
import { KittiesContext } from './KittiesContext';
import { abi } from './abi.js';

const Web3 = require("web3");
const contractAddress = "0x0d59911558E979D8C12296ff1A7e051279d4B9d0";

const Main = () => {
  const [accounts, setAccounts] = React.useState();
  const [kittyContractInstance, setKittyContractInstance] = React.useState();
  const [kittyContractOwner, setKittyContractOwner] = React.useState();

  if (!accounts) {
    // window.ethereum will be undefined during unit tests
    if (window.ethereum) {
      window.ethereum.enable().then(accts => {
        setAccounts(accts);
        var web3 = new Web3(Web3.givenProvider);
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accts[0] });
        setKittyContractInstance(instance);

        // instance.events.Birth().on('data', function(event){
        // });
        // instance.events.Purchase().on('data', function(event){
        // });
        // instance.events.TokenPrice().on('data', function(event){
        // });

        instance.methods.getOwnerAddress().call({from: accts[0]}).then(async (owner) => {
          setKittyContractOwner(owner);
        });
      });
    }
  }
  
  return (
    <BrowserRouter>
      <KittiesNavBar/>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <KittiesContext.Provider value={{ accounts, kittyContractInstance, kittyContractOwner }}>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Factory' component={Factory}></Route>
          <Route exact path='/Catalog' component={Catalog}></Route>
          <Route exact path='/MarketPlace' component={MarketPlace}></Route>
        </KittiesContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default Main;