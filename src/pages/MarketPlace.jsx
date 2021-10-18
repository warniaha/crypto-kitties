import React from 'react';
import Cat from '../components/Cat';
import { KittiesContext } from '../KittiesContext';
import { strict as assert } from 'assert';
import { loadKittyIds } from '../js/loadKittyIds';

const Web3 = require("web3");

function MarketPlace() {
    const { accounts, kittyContractInstance } = React.useContext(KittiesContext);
    const [ kittyIds, setKittyIds] = React.useState();
    const isOwner = (kittyOwner) => {
        return (kittyOwner.toLowerCase() === accounts[0].toLowerCase());
    }
    const getButtonSelectedClass = (selection, kittyOwner) => {
        if (isOwner(kittyOwner))
            return "btn btn-secondary";
        return selection ? "btn btn-primary" : "btn btn-success";
    }
    const onClickKitty = (id) => {
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
    /*
        const from = selectedCats[0].kittyOwner.toLowerCase();
        const to = accounts[0].toLowerCase();
     */
    const displayForSaleCats = () => {
        if (kittyIds) {
            return kittyIds.map(value => 
                <div className="catalogCat" key={value.catId} >
                    <button type="button" disabled={isOwner(value.kittyOwner)}
                        className={getButtonSelectedClass(value.selected, value.kittyOwner)} 
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
                        <div>Price: {value.price} ETH</div>
                    </button>
                </div>
            );
        }
    }
    React.useEffect(() => {
        if (!kittyIds && kittyContractInstance && kittyContractInstance.methods) {
            loadKittyIds(accounts, kittyContractInstance, setKittyIds, kittyContractInstance.methods.getKittiesForSale);
        }
    }, [setKittyIds, accounts, kittyContractInstance, kittyIds]);

    const getSelectedCats = () => {
        if (kittyIds){
            const selectedIds = kittyIds.filter((cat) => {
                if (cat.selected === true)
                    return cat;
                assert.equal(cat.selected, false, `cat.selected is not true or false: ${typeof(cat.selected)}:${cat.selected}`);
                return undefined;
            });
            return selectedIds;
        }
        return [];
    }

    const selectedCats = getSelectedCats();

    const onClickPurchaseSelected = (event) => {
        const kittyPrice = Web3.utils.toWei(selectedCats[0].price);
        const kittyId = selectedCats[0].catId;
        const from = selectedCats[0].kittyOwner.toLowerCase();
        const to = accounts[0].toLowerCase();
        if (from === to) {
            alert(`You already own kitty ID ${kittyId}`);
            return;
        }
        kittyContractInstance.methods.purchaseKitty(kittyId).send({from: accounts[0], value: kittyPrice}, function(error, txHash) {
            if (error)
                alert(error.message);
            else
                console.log(txHash);
        });
    }

    const getPurchaseButtonState = () => {
        // false means enabled
        return selectedCats.length !== 1;
    }

    return (
        <div className="MarketPlace">
            <h2>Kitties marketplace</h2>
            <h3>Select kitties to purchase</h3>
            <div className="container p-3 catalogCats">{displayForSaleCats()}</div>
            <div align="center">
                <button type="button" disabled={getPurchaseButtonState()} className="btn btn-primary" onClick={onClickPurchaseSelected}>Purchase Kitty</button>
            </div>
        </div>
    )
}

export default MarketPlace;
