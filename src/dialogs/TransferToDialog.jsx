import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { TransferToDialogContext } from './TransferToDialogContext';
import { KittiesContext } from '../KittiesContext';

const regexEthereumAddress = /^0x[a-fA-F0-9]{40}$/;
const doesNotMatchEthAddr = "Does not match a valid Ethereum address";

export default function TransferToDialog(props) {
    const {showTransferToDialog, setShowTransferToDialog} = React.useContext(TransferToDialogContext);
    const {accounts, kittyContractInstance} = React.useContext(KittiesContext);
    const [textFieldStatus, setTextFieldStatus] = React.useState(false);
    const [textFieldMessage, setTextFieldMessage] = React.useState(doesNotMatchEthAddr);
    const [transferToAddress, setTransferToAddress] = React.useState();

    const handleClose = () => {
        setShowTransferToDialog(false);
    }

    const onTransferTo = () => {
        props.list.map((cat) => {
            kittyContractInstance.methods.safeTransferFrom(accounts[0], transferToAddress, cat).send({ from: accounts[0] }, function(error, txHash) {
                if (error)
                    alert(error.message);
                else
                    console.log(txHash);
            });
            return undefined;
        });
        handleClose();
    }

    const onValidator = (value) => {
        const status = value.match(regexEthereumAddress);
        setTextFieldStatus(status);
        setTextFieldMessage(status ? "Matches valid Ethereum address" : doesNotMatchEthAddr)
        setTransferToAddress(value);
    }

    const divClass = (textFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (textFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (textFieldStatus ? "valid-feedback" : "invalid-feedback");

    return (
        <Modal show={showTransferToDialog} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title>Transfer your kitties</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={divClass}>
                    <input type="text"
                        className={inputClass}
                        id="ethereum-address"
                        name="input-ethereum-address"
                        placeholder="Please enter an Ethereum address to transfer to"
                        onChange={(event) => onValidator(event.target.value)}
                    />
                    <div className={feedbackClass}>{textFieldMessage}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button disabled={!textFieldStatus} onClick={onTransferTo} variant="primary">
                    Transfer to
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
