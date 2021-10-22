// const truffleAssert = require("truffle-assertions");
// const BigNumber = require('bignumber.js');
// const Web3 = require('web3');
// const KittyContract = artifacts.require("KittyContract");

// module.exports = async () => {
//     console.log(`getting deployed contract`);
//     const kittyContract = KittyContract.deployed();
//     console.log(`getting accounts`);
//     var accounts = Web3.eth.getAccounts();
//     [alice] = accounts;
//     console.log(`setting alice: ${alice}`);

//     var kitty = [new BigNumber('3469413632706921'),new BigNumber('3417202223638021'),new BigNumber('3612528123897521'),new BigNumber('6129893623231621'),new BigNumber('2324449521661731'),new BigNumber('8245116311254411'),new BigNumber('7573615212226031'),new BigNumber('5933468131377721'),new BigNumber('1354795633778241'),new BigNumber('6862225813453841'),];

//     var initialSupply = await kittyContract.totalSupply({from: alice});
//     console.log(`initialSupply: ${initialSupply.toNumber()}`);

//     kittyCreation = kitty.map((cat) => {
//         return kittyContract.createKittyGen0(kitty[loop], {from: alice});
//     });

//     Promise.all(kittyCreation);
//     const oneEth = Web3.utils.toWei('0.0000001', 'ether');

//     var totalSupply = await kittyContract.totalSupply({from: alice});
//     console.log(`totalSupply: ${totalSupply.toNumber()}`);

//     for (var loop = 0; loop < kitty.length; loop++) {
//         console.log(`setting price of ${loop+initialSupply}: to ${oneEth} Wei`);
//         await kittyContract.setTokenPrice(loop+initialSupply, new BigNumber(oneEth), {from: alice});
//     }
// }
var kittyContract = await KittyContract.deployed()
var alice = accounts[0]
const oneEth = web3.utils.toWei('0.0000001', 'ether');
const BigNumber = require('bignumber.js');
await kittyContract.setTokenPrice(6, new BigNumber(oneEth), {from: alice});
await kittyContract.setTokenPrice(7, new BigNumber(oneEth), {from: alice});
await kittyContract.setTokenPrice(8, new BigNumber(oneEth), {from: alice});
await kittyContract.setTokenPrice(9, new BigNumber(oneEth), {from: alice});
var totalSupply = (await kittyContract.totalSupply()).toNumber();

(await kittyContract.breed(totalSupply-10, totalSupply-1, {from: alice})).receipt.status;
totalSupply = (await kittyContract.totalSupply()).toNumber();
totalSupply
(await kittyContract.setTokenPrice(totalSupply-1, new BigNumber(oneEth), {from: alice})).receipt.status;
