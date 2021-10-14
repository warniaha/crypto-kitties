import React from 'react';
import Cat from '../components/Cat';
import { KittiesContext } from '../KittiesContext';
import { decomposeDna } from "../js/dna";
import { strict as assert } from 'assert';

function Catalog() {
    const { accounts, kittyContractInstance } = React.useContext(KittiesContext);
    const [ kittyIds, setKittyIds] = React.useState();
    const loadKittyIds = async () => {
        if (kittyContractInstance) {
            kittyContractInstance.methods.getKittyList().call({ from: accounts[0] }).then(async (kitties) => {
                if (kitties.length > 0) {
                    const kittyPromises = kitties.map(value => {
                        return kittyContractInstance.methods.getKitty(value).call({ from: accounts[0]});
                    });
                    const kittyData = await Promise.all(kittyPromises);
                    if (kittyData.length > 0) {
                        const catData = kittyData.map(cat => {
                            const selected = false;
                            return {...cat, selected};
                        });
                        console.log(`catData: ${JSON.stringify(catData)}`);
                        setKittyIds(catData);
                    }
                }
            }
            , error => {
                console.log(`error: ${error}`);
            });
        }
    }
    const getButtonSelectedClass = (selection) => {
        return selection ? "btn btn-primary" : "btn btn-secondary";
    }
    const onClickKitty = (id) => {
        console.log(`onClickKitty(id): ${id}`);
        const newKittyIds = kittyIds.map((cat) => {
            if (cat.catId === id) {
                var newCat = {...cat};
                newCat.selected = !newCat.selected;
                return newCat;
            }
            return cat;
        });
        setKittyIds(newKittyIds);
    }
    const displayOwnedCats = () => {
        if (kittyIds) {
            // {"0":"0","1":"0","2":"0","3":"2087534233176531","4":"1634217850","5":"0x3a715d283cC6276a3023005D69608677792Fa04d","6":"6",
            //  "mumId":"0","dadId":"0","generation":"0","genes":"2087534233176531","birthTime":"1634217850",
            //  "kittyOwner":"0x3a715d283cC6276a3023005D69608677792Fa04d","catId":"6","selected":false},
            return kittyIds.map(value => 
                <div key={value.catId} >
                    <button type="button" 
                        className={getButtonSelectedClass(value.selected)} 
                        onClick={() => onClickKitty(value.catId)} >
                        <div className="catBox">
                            <Cat factoryDna={value.genes.toString()} />
                        </div>
                        <div>ID: {value.catId}</div>
                        <div>Genes: {value.genes.toString()}</div>
                        <div>Generation: {value.generation}</div>
                        <div className="flexDivRow">
                            <div>Mom: {value.mumId}</div>
                            <div>Dad: {value.dadId}</div>
                        </div>
                    </button>
                    <br></br>
                    <br></br>
                </div>
            );
        }
    }
    React.useEffect(() => {
        if (!kittyIds) {
            loadKittyIds();
        }
    })

    const getSelectedCats = () => {
        if (kittyIds){
            const selectedIds = kittyIds.filter((cat) => {
                if (cat.selected === true)
                    return cat;
                assert.equal(cat.selected, false);
                return undefined;
            });
            return selectedIds;
        }
        return [];
    }

    const selectedCats = getSelectedCats();//kittyIds ? kittyIds.filter((cat) => cat.selected === true) : [];;
    console.log(`selectedCats: ${selectedCats.length}`);

    const onClickBreedSelected = (event) => {
        console.log(`onClickBreedSelected`);
        const sire = selectedCats[0];
        const dame = selectedCats[1];
        if (kittyContractInstance) {
            kittyContractInstance.methods.breed(sire.catId, dame.catId).send({ from: accounts[0] }, function(error, txHash) {
                if (error)
                    console.log(error);
                else
                    console.log(txHash);
            });
        }
    }

    const onClickTransfer = (event) => {
        const ids = selectedCats.map((cat) => {
            return cat.catId;
        })
        console.log(`onClickTransfer catIds: ${ids}`);
    }

    const getBreedSelectedButtonState = () => {
        // false means enabled
        return selectedCats.length !== 2;
    }

    const getTransferButtonState = () => {
        // false means enabled
        return selectedCats.length === 0;
    }
    if (kittyIds) {
        const id5 = kittyIds.find(cat => cat.catId === 5);
        if (id5) {
            const dna = decomposeDna(id5.genes);
            console.log(`id 5 dna: ${JSON.stringify(dna)}`);
        }
    }
    return (
        <div className="Catalog">
            <h2>Kitties catalog</h2>
            <h3>Select kitties to breed or transfer</h3>
            <div className="container p-3 catalogCats">{displayOwnedCats()}</div>
            <div className="homeButtonBar col-lg-11">
                <button type="button" disabled={getBreedSelectedButtonState()} className="btn btn-primary" onClick={onClickBreedSelected}>Breed selected</button>
                <button type="button" disabled={getTransferButtonState()} className="btn btn-primary" onClick={onClickTransfer}>Transfer</button>
            </div>
        </div>
    )
}

export default Catalog;
