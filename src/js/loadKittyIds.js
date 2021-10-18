import { strict as assert } from 'assert';

const Web3 = require("web3");

export const loadKittyIds = async (accounts, kittyContractInstance, setKittyIds, getMethod) => {
    if (kittyContractInstance) {
        getMethod().call({ from: accounts[0] }).then(async (kitties) => {
            if (kitties.length > 0) {
                const kittyPromises = kitties.map(value => {
                    return kittyContractInstance.methods.getKitty(value).call({ from: accounts[0]});
                });
                var kittyData = await Promise.all(kittyPromises);
                const catPricePromises = kittyData.map((cat) => {
                    return kittyContractInstance.methods.getTokenPrice(cat.catId).call({ from: accounts[0]});
                })
                const kittyPrices = await Promise.all(catPricePromises);
                if (kittyData.length > 0) {
                    assert(kittyData.length === kittyPrices.length, `kittyData.length !== kittyPrices.length: ${kittyData.length}:${kittyPrices.length}`);
                    for (var loop = 0; loop < kittyData.length; loop++) {
                        const price = Web3.utils.fromWei(kittyPrices[loop]);
                        kittyData[loop] = {...kittyData[loop], price};
                    }
                    const catData = kittyData.map((cat) => {
                        const selected = false;
                        return {...cat, selected};
                    });
                    setKittyIds(catData);
                }
            }
        }
        , error => {
            alert(error.message);
        });
    }
}
