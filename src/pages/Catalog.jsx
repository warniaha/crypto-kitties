import React from 'react';
import Cat from '../components/Cat';
import { KittiesContext } from '../KittiesContext';
import { strict as assert } from 'assert';
import { TransferToDialogContext } from '../dialogs/TransferToDialogContext';
import { MarketPriceDialogContext } from '../dialogs/MarketPriceDialogContext';
import TransferToDialog from '../dialogs/TransferToDialog';
import MarketPriceDialog from '../dialogs/MarketPriceDialog';
import { loadKittyIds } from '../js/loadKittyIds';

function Catalog() {
    const { accounts, kittyContractInstance } = React.useContext(KittiesContext);
    const [ kittyIds, setKittyIds] = React.useState();
    const getButtonSelectedClass = (selection) => {
        return selection ? "btn btn-primary" : "btn btn-secondary";
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
    const getSalePrice = (price) => {
        return price === "0" ? `Not for sale`: `Price: ${price} ETH`;
    }
    const displayOwnedCats = () => {
        if (kittyIds) {
            return kittyIds.map(value => 
                <div className="catalogCat" key={value.catId} >
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
                        <div>{getSalePrice(value.price)}</div>
                    </button>
                </div>
            );
        }
    }
    React.useEffect(() => {
        if (!kittyIds && kittyContractInstance && kittyContractInstance.methods) {
            loadKittyIds(accounts, kittyContractInstance, setKittyIds, kittyContractInstance.methods.getKittyList);
        }
    }, [setKittyIds, accounts, kittyContractInstance, kittyIds])

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

    const selectedCats = getSelectedCats();//kittyIds ? kittyIds.filter((cat) => cat.selected === true) : [];;

    const onClickBreedSelected = (event) => {
        const sire = selectedCats[0];
        const dame = selectedCats[1];
        if (kittyContractInstance) {
            kittyContractInstance.methods.breed(sire.catId, dame.catId).send({ from: accounts[0] }, function(error, txHash) {
                if (error)
                    alert(error.message);
                else
                    console.log(txHash);
            });
        }
    }

    const onClickSellOnMarketPlace = (event) => {
        event.preventDefault();
        setShowMarketPriceDialog(true);
    }

    const onClickTransfer = async (event) => {
        event.preventDefault();
        setShowTransferToDialog(true);
    }

    const getBreedSelectedButtonState = () => {
        // false means enabled
        return selectedCats.length !== 2;
    }

    const getMarketPlaceButtonState = () => {
        return selectedCats.length !== 1;
    }

    const getTransferButtonState = () => {
        // false means enabled
        return selectedCats.length === 0;
    }
    const [showTransferToDialog, setShowTransferToDialog] = React.useState(false);
    const [showMarketPriceDialog, setShowMarketPriceDialog] = React.useState(false);

    return (
        <div className="Catalog">
            <TransferToDialogContext.Provider value={{ showTransferToDialog, setShowTransferToDialog }}>
                <MarketPriceDialogContext.Provider value={{ showMarketPriceDialog, setShowMarketPriceDialog }}>
                    <h2>Kitties catalog</h2>
                    <h3>Select kitties to breed or transfer</h3>
                    <div className="container p-3 catalogCats">{displayOwnedCats()}</div>
                    <div className="homeButtonBar col-lg-11">
                        <button type="button" disabled={getBreedSelectedButtonState()} className="btn btn-primary" onClick={onClickBreedSelected}>Breed selected</button>
                        <button type="button" disabled={getMarketPlaceButtonState()} className="btn btn-primary" onClick={onClickSellOnMarketPlace}>Sell on MarketPlace</button>
                        <button type="button" disabled={getTransferButtonState()} className="btn btn-primary" onClick={onClickTransfer}>Transfer</button>
                    </div>
                    <TransferToDialog list={selectedCats.map(cat => cat.catId)} />
                    <MarketPriceDialog list={selectedCats.map(cat => cat.catId)} />
                </MarketPriceDialogContext.Provider>
            </TransferToDialogContext.Provider>
        </div>
    )
}

export default Catalog;
