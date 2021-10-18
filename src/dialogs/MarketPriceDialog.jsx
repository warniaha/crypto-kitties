import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { MarketPriceDialogContext } from './MarketPriceDialogContext';
import { KittiesContext } from '../KittiesContext';
import BigNumber from "bignumber.js";

const Web3 = require("web3");
const sellPriceGreaterThanZero = "Sell price must be greater than zero";

export default function MarketPriceDialog(props) {
    const {showMarketPriceDialog, setShowMarketPriceDialog} = React.useContext(MarketPriceDialogContext);
    const {accounts, kittyContractInstance} = React.useContext(KittiesContext);
    const [textFieldStatus, setTextFieldStatus] = React.useState(false);
    const [textFieldMessage, setTextFieldMessage] = React.useState(sellPriceGreaterThanZero);
    const [sellAmount, setSellAmount] = React.useState();

    const handleClose = () => {
        setShowMarketPriceDialog(false);
    }

    const onSetPrice = () => {
        props.list.map((cat) => {
            kittyContractInstance.methods.setTokenPrice(cat, Web3.utils.toWei(sellAmount, 'ether')).send({ from: accounts[0] }, function(error, txHash) {
                if (error)
                    alert(error.message);
                else
                    console.log(txHash);
            });
            return undefined;
        });
        handleClose();
    }

    const onValidator = (dollarAmount) => {
        if (typeof(dollarAmount) === "string") {
            dollarAmount = dollarAmount.replace(/[^\d.-]/g, ''); // remove non-digits like $ or ,
        }
        const bigNum = new BigNumber(dollarAmount);
        const status = bigNum.isGreaterThan(0);
        setTextFieldStatus(status);
        setTextFieldMessage(status ? "Valid sell price" : sellPriceGreaterThanZero);
        setSellAmount(dollarAmount);
    }

    const divClass = (textFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (textFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (textFieldStatus ? "valid-feedback" : "invalid-feedback");

    return (
        <Modal show={showMarketPriceDialog} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title>Sell your kitty on Market Place</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={divClass}>
                    <input type="text"
                        className={inputClass}
                        id="kitty-marketplace-price"
                        name="input-kitty-marketplace-price"
                        placeholder="Please enter the amount to sell your kitty for"
                        onChange={(event) => onValidator(event.target.value)}
                    />
                    <div className={feedbackClass}>{textFieldMessage}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button disabled={!textFieldStatus} onClick={onSetPrice} variant="primary">
                    Set Price
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
