import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'jquery/dist/jquery.slim.min.js';
// import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.min.js';

import Factory from './pages/Factory';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import KittiesNavBar from './KittiesNavBar'
import { KittiesContext } from './KittiesContext';
import { abi } from './abi.js';

const Web3 = require("web3");
const contractAddress = "0xae855AaAa34671CD2F912927BD5115EA10987F99";

const Main = () => {
  const [value, setValue] = React.useState("Hello from useState/useContext");
  const [accounts, setAccounts] = React.useState();
  const [kittyContractInstance, setKittyContractInstance] = React.useState();
  // const store = { values: value, setValue,
  //                 accounts: accounts, setAccounts,
  //                 contract: kittyContractInstance, setKittyContractInstance };
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