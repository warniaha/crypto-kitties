import React from 'react';
import Cat from '../components/Cat'
import Cattributes from '../components/Cattributes'
import CatDna from '../components/CatDna';
import 'bootstrap/dist/css/bootstrap.min.css';
import { defaultDnaString, buildDna, createRandomDna } from '../js/dna';
import { KittiesContext } from '../KittiesContext';
import BigNumber from "bignumber.js";

const loadingAccounts = "Loading the accounts, please wait...";
const notContractOwner = "You are not the contract owner and will not be able to create kitties in this factory";
const createKittiesAsOwner = "Create your custom Kitty";

function Factory() {
    const [factoryDna, setFactoryDna] = React.useState(defaultDnaString);
    const { accounts, kittyContractInstance, kittyContractOwner } = React.useContext(KittiesContext);
    const onClickRandom = (event) => {
        event.preventDefault();
        setFactoryDna(buildDna(createRandomDna()));
    }
    
    const onClickDefault = (event) => {
        event.preventDefault();
        setFactoryDna(defaultDnaString);
    }
    
    const onClickCreate = (event) => {
        event.preventDefault();
        birthKitty(new BigNumber(factoryDna));
    }

    const birthKitty = (dna) => {
        kittyContractInstance.methods.createKittyGen0(dna).send({ from: accounts[0] }, function(error, txHash) {
            if (error) {
                alert(error.message);
            }
            else
                console.log(txHash);
        });
    }

    const ownedByOperator = (accounts && kittyContractOwner && kittyContractOwner.toLowerCase() === accounts[0].toLowerCase());
    const instructions = accounts ? (ownedByOperator ? createKittiesAsOwner : notContractOwner) : loadingAccounts;
    
    return (
        <div className="Factory">
            <div align="center">
                <h1 className="c-white">Kitties-Factory</h1>
                <p className="c-white">{instructions}</p>
            </div>
            <div className="container p-5 catContainer">
                <div className="row">
                    <div className="col-lg-4 catBox m-2 light-b-shadow">
                        <Cat factoryDna={factoryDna} />
                        <CatDna factoryDna={factoryDna} />
                    </div>
                    <Cattributes setFactoryDna={setFactoryDna} factoryDna={factoryDna}/>
                </div>
                <div className="buttonBar col-lg-11">
                    <div>
                        <button type="button" className="btn btn-primary" onClick={onClickRandom}>Random</button>
                        <button type="button" className="btn btn-primary" onClick={onClickDefault}>Default</button>
                    </div>
                    <button disabled={!ownedByOperator} type="button" className="btn btn-success" onClick={onClickCreate}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Factory;
