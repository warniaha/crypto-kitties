import React from 'react';
import Cat from '../components/Cat'
import Cattributes from '../components/Cattributes'
import CatDna from '../components/CatDna';
import 'bootstrap/dist/css/bootstrap.min.css';
import { defaultDnaString, buildDna, createRandomDna } from '../js/dna';
import { KittiesContext } from '../KittiesContext';

function Factory() {
    const [factoryDna, setFactoryDna] = React.useState(defaultDnaString);
    const { accounts, kittyContractInstance } = React.useContext(KittiesContext);
    // console.log(`Factory: ${JSON.stringify(store)}`);
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
        console.log(`Birthing kitty with factoryDna: ${factoryDna}`);
        birthKitty(parseInt(factoryDna));
    }

    const birthKitty = (dna) => {
        kittyContractInstance.methods.createKittyGen0(dna).send({ from: accounts[0] }, function(error, txHash) {
            if (error)
                console.log(error);
            else
                console.log(txHash);
        });
    }
    
    return (
        <div className="Factory">
            <div className="container p-5 catContainer">
                <div align="center">
                    <h1 className="c-white">Kitties-Factory</h1>
                    <p className="c-white">Create your custom Kitty</p>
                </div>
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
                    <button type="button" className="btn btn-success" onClick={onClickCreate}>Create</button>
                </div>
            </div>
            <div>
                {JSON.stringify(accounts)}
            </div>
        </div>
    )
}

export default Factory;
