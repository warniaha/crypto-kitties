const given = require('mocha-testdata');
const KittyContract = artifacts.require("KittyContract");
const truffleAssert = require("truffle-assertions");
const BigNumber = require('bignumber.js');
const Web3 = require('web3');

const defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
}

function decomposeDna(factoryDna) {
    var dna = defaultDNA;
    dna.headcolor = parseInt(factoryDna.substr(0, 2));
    dna.mouthColor = parseInt(factoryDna.substr(2, 2));
    dna.eyesColor = parseInt(factoryDna.substr(4, 2));
    dna.earsColor = parseInt(factoryDna.substr(6, 2));
    dna.eyesShape = parseInt(factoryDna.substr(8, 1));
    dna.decorationPattern = parseInt(factoryDna.substr(9, 1));
    dna.decorationMidcolor = parseInt(factoryDna.substr(10, 2));
    dna.decorationSidescolor = parseInt(factoryDna.substr(12, 2));
    dna.animation = parseInt(factoryDna.substr(14, 1));
    dna.lastNum = parseInt(factoryDna.substr(15, 1));
    return dna;
}

contract("KittyContract", accounts => {
    // given([
    //     {
    //         dna: "5247984311453321", headColor: 52, mouthColor: 47, eyesColor: 98, earsColor: 43, eyesShape: 1,  decorationPattern: 1, decorationMidColor: 45, decorationEdgeColor: 33, animation: 2, lastnum: 1
    //     },
    //     {
    //         dna: "1160743022757131", headColor: 11, mouthColor: 60, eyesColor: 74, earsColor: 30, eyesShape: 2, decorationPattern: 2, decorationMidColor: 75, decorationEdgeColor: 71, animation: 3, lastnum: 1
    //     },
    //     {
    //         dna: "3875593022721831", headColor: 38, mouthColor: 75, eyesColor: 59, earsColor: 30, eyesShape: 2, decorationPattern: 2, decorationMidColor: 72, decorationEdgeColor: 18, animation: 3, lastnum: 1
    //     },
    //     {
    //         dna: "3180945321803111", headColor: 31, mouthColor: 80, eyesColor: 94, earsColor: 53, eyesShape: 2, decorationPattern: 1, decorationMidColor: 80, decorationEdgeColor: 31, animation: 1, lastnum: 1
    //     },
    //     {
    //         dna: "1879852322965841", headColor: 18, mouthColor: 79, eyesColor: 85, earsColor: 23, eyesShape: 2, decorationPattern: 2, decorationMidColor: 96, decorationEdgeColor: 58, animation: 4, lastnum: 1
    //     },
    //     {
    //         dna: "8839874833182731", headColor: 88, mouthColor: 39, eyesColor: 87, earsColor: 48, eyesShape: 3, decorationPattern: 3, decorationMidColor: 18, decorationEdgeColor: 27, animation: 3, lastnum: 1
    //     },
    //     {
    //         dna: "2087534233176531", headColor: 20, mouthColor: 87, eyesColor: 53, earsColor: 42, eyesShape: 3, decorationPattern: 3, decorationMidColor: 17, decorationEdgeColor: 65, animation: 3, lastnum: 1
    //     },
    //     {
    //         dna: "1160743033176531", headColor: 11, mouthColor: 60, eyesColor: 74, earsColor: 30, eyesShape: 3, decorationPattern: 3, decorationMidColor: 17, decorationEdgeColor: 65, animation: 3, lastnum: 1
    //     },
    //     {
    //         dna: "8839874833176531", headColor: 88, mouthColor: 39, eyesColor: 87, earsColor: 48, eyesShape: 3, decorationPattern: 3, decorationMidColor: 17, decorationEdgeColor: 65, animation: 3, lastnum: 1
    //     },
    // ]).
    // it('Should be able to extract the elements from the dna strings', async function ({ dna, headColor, mouthColor,
    //     eyesColor, earsColor, eyesShape, decorationPattern, decorationMidColor, decorationEdgeColor, animation, lastnum }) {
    //     var kittyContract = await KittyContract.deployed();
    //     let [alice, bob, chuck, david] = accounts;
    //     var head = await kittyContract.extractHeadColor(new BigNumber(dna), {from: alice});
    //     assert.equal(head.toNumber(), headColor, `Head color doesn't match`);
    //     var mouth = await kittyContract.extractMouthColor(new BigNumber(dna), {from: alice});
    //     assert.equal(mouth.toNumber(), mouthColor, `Mouth color doesn't match`);
    //     var eyes = await kittyContract.extractEyesColor(new BigNumber(dna), {from: alice});
    //     assert.equal(eyes.toNumber(), eyesColor, `Eye color doesn't match`);
    //     var ears = await kittyContract.extractEarsColor(new BigNumber(dna), {from: alice});
    //     assert.equal(ears.toNumber(), earsColor, `Ear color doesn't match`);
    //     var eyeShape = await kittyContract.extractEyeShape(new BigNumber(dna), {from: alice});
    //     assert.equal(eyeShape.toNumber(), eyesShape, `Eye shape doesn't match`);
    //     var decoPat = await kittyContract.extractDecorationPattern(new BigNumber(dna), {from: alice});
    //     assert.equal(decoPat.toNumber(), decorationPattern, `Decoration pattern doesn't match`);
    //     var decoMid = await kittyContract.extractDecorationMidColor(new BigNumber(dna), {from: alice});
    //     assert.equal(decoMid.toNumber(), decorationMidColor, `Decoration mid color doesn't match`);
    //     var decoEdge = await kittyContract.extractDecorationEdgeColor(new BigNumber(dna), {from: alice});
    //     assert.equal(decoEdge.toNumber(), decorationEdgeColor, `Decoration edge color doesn't match`);
    //     var ani = await kittyContract.extractAnimation(new BigNumber(dna), {from: alice});
    //     assert.equal(ani.toNumber(), animation, `Animation doesn't match`);
    //     var last = await kittyContract.extractLastnum(new BigNumber(dna), {from: alice});
    //     assert.equal(last.toNumber(), lastnum, `Lastnum doesn't match`);
    // });

    // given([
    //     {
    //         dna1: "8839874833176531", dna2: "5247984311453321",
    //     },
    //     {
    //         dna1: "5247984311453321", dna2: "1160743022757131",
    //     },
    //     {
    //         dna1: "1160743022757131", dna2: "3875593022721831",
    //     },
    //     {
    //         dna1: "3875593022721831", dna2: "3180945321803111",
    //     },
    //     {
    //         dna1: "3180945321803111", dna2: "1879852322965841",
    //     },
    //     {
    //         dna1: "1879852322965841", dna2: "8839874833182731",
    //     },
    //     {
    //         dna1: "8839874833182731", dna2: "2087534233176531",
    //     },
    //     {
    //         dna1: "2087534233176531", dna2: "1160743033176531",
    //     },
    //     {
    //         dna1: "1160743033176531", dna2: "8839874833176531",
    //     },
    // ]).
    // it('Should be able to mix dna and have valid values', async function ({ dna1, dna2 }) {
    //     var kittyContract = await KittyContract.deployed();
    //     let [alice, bob, chuck, david] = accounts;
    //     const mixVariantBN = await kittyContract.mixVariantCount();
    //     const mixVariants = mixVariantBN.toNumber();
    //     for (var loop = 0; loop < mixVariants; loop++) {
    //         // test each of the 4 variants
    //         var dnaValue = await kittyContract.mixDna(new BigNumber(dna1), new BigNumber(dna2), loop, {from: alice});
    //         var dna = decomposeDna(dnaValue.toString())
    //         assert(dna.headcolor >= 10 && dna.headcolor <= 98, `headcolor is out of range: ${dna.headcolor} for variant ${loop}`);
    //         assert(dna.mouthColor >= 10 && dna.mouthColor <= 98, `mouthColor is out of range: ${dna.mouthColor} for variant ${loop}`);
    //         assert(dna.eyesColor >= 10 && dna.eyesColor <= 98, `eyesColor is out of range: ${dna.eyesColor} for variant ${loop}`);
    //         assert(dna.earsColor >= 10 && dna.earsColor <= 98, `earsColor is out of range: ${dna.earsColor} for variant ${loop}`);
    //         assert(dna.eyesShape >= 1 && dna.eyesShape <= 3, `eyesShape is out of range: ${dna.eyesShape} for variant ${loop}`);
    //         assert(dna.decorationPattern >= 1 && dna.decorationPattern <= 3, `decorationPattern is out of range: ${dna.decorationPattern} for variant ${loop}`);
    //         assert(dna.decorationMidcolor >= 10 && dna.decorationMidcolor <= 98, `decorationMidcolor is out of range: ${dna.decorationMidcolor} for variant ${loop}`);
    //         assert(dna.decorationSidescolor >= 10 && dna.decorationSidescolor <= 98, `decorationSidescolor is out of range: ${dna.decorationSidescolor} for variant ${loop}`);
    //         assert(dna.animation >= 1 && dna.animation <= 4, `animation is out of range: ${dna.animation} for variant ${loop}`);
    //         assert.equal(dna.lastNum, 1, `lastNum is out of range: ${dna.lastNum} for variant ${loop}`);
    //     }
    // });
    describe("Testing state of KittyContract", () => {
        var kittyContract;
        var alice;
        var bob;
        var chuck;
        var david;
        var totalSupply;
        var kittyId1;
        var kittyId2;
        var kittyId3;
        var aliceBalance;
        var bobBalance;
        var chuckBalance;
        var davidBalance;
        const zeroEth = Web3.utils.toWei('0', 'ether');
        const oneEth = Web3.utils.toWei('0.0001', 'ether');
        const twoEth = Web3.utils.toWei('0.0002', 'ether');
        const threeEth = Web3.utils.toWei('0.0003', 'ether');
        var kitty1Price;
        var kitty2Price;
        var kitty3Price;

        before(async () => {
            kittyContract = await KittyContract.deployed();
            [alice, bob, chuck, david] = accounts;
        });

        it("Initial state shouldn't have any kitties", async () => {
            totalSupply = await kittyContract.totalSupply({from: alice});
            assert.equal(totalSupply.toNumber(), 0, `Total supply should be zero when the tests first start, returned: ${totalSupply.toNumber()}`);
        });

        it("Create kitty 1 (ID 0)", async () => {
            truffleAssert.passes(await kittyContract.createKittyGen0(new BigNumber("5247984311453321"), {from: alice}));
            kittyId1 = await kittyContract.totalSupply({from: alice});
        });

        it("Create kitty 2 (ID 1)", async () => {
            truffleAssert.passes(await kittyContract.createKittyGen0(new BigNumber("9660825823147031"), {from: alice}));
            kittyId2 = await kittyContract.totalSupply({from: alice});
        });

        it("Validate total supply after creating two kitties", async () => {
            totalSupply = await kittyContract.totalSupply({from: alice});
            assert.equal(totalSupply.toNumber(), 2, `Total supply should be two after creating 2 kitties, returned: ${totalSupply.toNumber()}`);
        });

        it("Validate kittyId1 == 0", async () => {
            assert.equal(kittyId1.toNumber()-1, 0, `First kitty should be ID: 0, returned: ${kittyId1.toNumber()}`);
        });

        it("Validate kittyId2 == 1", async () => {
            assert.equal(kittyId2.toNumber()-1, 1, `Second kitty should be ID: 1, returned: ${kittyId2.toNumber()}`);
        });

        it("breed kitty1 & kitty2", async () => {
            truffleAssert.passes(await kittyContract.breed(0, 1, {from: alice}));
        });

        it("Validate kittyId3 == 2", async () => {
            kittyId3 = await kittyContract.totalSupply({from: alice});
            assert.equal(kittyId3.toNumber()-1, 2, `Newborn kitty should be ID: 2, returned: ${kittyId3.toNumber()}`);
        });

        it("Validate totlSupply == 3", async () => {
            totalSupply = await kittyContract.totalSupply({from: alice});
            assert.equal(totalSupply.toNumber(), 3, `Total supply should be three after creating 2 kitties and breeding them, returned: ${totalSupply.toNumber()}`);
        });

        it("Validate alice's balance == 3", async () => {
            truffleAssert.passes(aliceBalance = await kittyContract.balanceOf(alice, {from: alice}));
            assert.equal(aliceBalance.toNumber(), 3, `Alice should have three kitties, returned: ${aliceBalance.toNumber()}`);
        });

        it("Validate bob's balance == 0", async () => {
            truffleAssert.passes(bobBalance = await kittyContract.balanceOf(bob, {from: bob}));
            assert.equal(bobBalance.toNumber(), 0, `Bob should have no kitties, returned: ${bobBalance.toNumber()}`);
        });

        it("Alice transfers kitty3 to bob", async () => {
            truffleAssert.passes(await kittyContract.safeTransferFrom(alice, bob, kittyId3.toNumber()-1, {from: alice}));
        });

        it("Validate alice's balance == 2", async () => {
            aliceBalance = await kittyContract.balanceOf(alice, {from: alice});
            assert.equal(aliceBalance.toNumber(), 2, `Alice should have two kitties, returned: ${aliceBalance.toNumber()}`);
        });

        it("Validate bob's balance == 1", async () => {
            bobBalance = await kittyContract.balanceOf(bob, {from: bob});
            assert.equal(bobBalance.toNumber(), 1, `Bob should have one kitties, returned: ${bobBalance.toNumber()}`);
        });

        it("add kitty1 to the marketplace", async () => {
            truffleAssert.passes(await kittyContract.setTokenPrice(kittyId1.toNumber()-1, new BigNumber(oneEth), {from: alice}));
        });

        it("add kitty1 to the marketplace again", async () => {
            truffleAssert.passes(await kittyContract.setTokenPrice(kittyId1.toNumber()-1, new BigNumber(oneEth), {from: alice}));
            var kittiesForSale = await kittyContract.getKittiesForSale({from: alice});
            assert.equal(kittiesForSale.length, 1, `One kitty should be available for sale, returned: ${kittiesForSale.length}`);
        });

        it("add kitty2 to the marketplace", async () => {
            truffleAssert.passes(await kittyContract.setTokenPrice(kittyId2.toNumber()-1, new BigNumber(twoEth), {from: alice}));
        });

        it("add kitty3 to the marketplace", async () => {
            truffleAssert.passes(await kittyContract.setTokenPrice(kittyId3.toNumber()-1, new BigNumber(threeEth), {from: bob}));
        });

        it("Validate 3 kitties in the marketplace", async () => {
            var kittiesForSale = await kittyContract.getKittiesForSale({from: alice});
            assert.equal(kittiesForSale.length, 3, `Three kitties should be available for sale, returned: ${kittiesForSale.length}`);
        });

        it("Validate price of kitty1", async () => {
            truffleAssert.passes(kitty1Price = await kittyContract.getTokenPrice(kittyId1.toNumber()-1));
            assert.equal(kitty1Price, oneEth, "Price for kitty1 should be oneEth");
        });

        it("Validate price of kitty2", async () => {
            truffleAssert.passes(kitty2Price = await kittyContract.getTokenPrice(kittyId2.toNumber()-1));
            assert.equal(kitty2Price, twoEth, "Price for kitty2 should be twoEth");
        });

        it("Validate price of kitty2", async () => {
            truffleAssert.passes(kitty3Price = await kittyContract.getTokenPrice(kittyId3.toNumber()-1));
            assert.equal(kitty3Price, threeEth, "Price for kitty3 should be threeEth");
        });

        it("Chuck to purchase kitty1", async () => {
            truffleAssert.passes(await kittyContract.purchaseKitty(kittyId1.toNumber()-1, {from: chuck, value: new BigNumber(oneEth)}));
        });

        it("Validate chuck's balance == 1", async () => {
            truffleAssert.passes(chuckBalance = await kittyContract.balanceOf(chuck, {from: chuck}));
            assert.equal(chuckBalance.toNumber(), 1, `Chuck should have one kitties, returned: ${chuckBalance.toNumber()}`);
        });

        it("Validate kitty1 is no longer for sale", async () => {
            truffleAssert.passes(kitty1Price = await kittyContract.getTokenPrice(kittyId1.toNumber()-1));
            assert.equal(Web3.utils.fromWei(zeroEth), 0, "kitty1 should no longer be for sale (sale price == 0)");
        });

        it("David to attempt to purchase kitty3 with 2 ETH (should fail)", async () => {
            try {
                await kittyContract.purchaseKitty(kittyId3.toNumber()-1, {from: david, value: new BigNumber(twoEth)});
                assert(false, "Failure was expected with insufficient funds");
            }
            catch (err) {
                assert(err.message.includes("Insufficient funds"), "Should have failed with insufficient funds");
            }
        });

        it("David to attempt to purchase kitty3 with 3 ETH", async () => {
            truffleAssert.passes(await kittyContract.purchaseKitty(kittyId3.toNumber()-1, {from: david, value: new BigNumber(threeEth)}));
        });

        it("Validate david's balance == 1", async () => {
            truffleAssert.passes(davidBalance = await kittyContract.balanceOf(david, {from: david}));
            assert.equal(davidBalance.toNumber(), 1, `David should have one kitties, returned: ${davidBalance.toNumber()}`);
        });

        it("Validate kitty3 is no longer for sale", async () => {
            truffleAssert.passes(kitty3Price = await kittyContract.getTokenPrice(kittyId3.toNumber()-1));
            assert.equal(Web3.utils.fromWei(zeroEth), 0, "kitty3 should no longer be for sale (sale price == 0)");
        });

        it("bob attempts to add kitty3 to the marketplace (should fail since david is the owner)", async () => {
            try {
                await kittyContract.setTokenPrice(kittyId3.toNumber()-1, new BigNumber(threeEth), {from: bob});
                assert(false, "Failure was expected, david should be the owner");
            }
            catch (err) {
                assert(err.message.includes("Only the owner/operator can approve"), "Should have failed with wrong owner");
            }
        });

        it("david attempts to transfer kitty3 to self (should fail since david is already the owner)", async () => {
            try {
                await kittyContract.transfer(david, kittyId3.toNumber()-1, {from: david});
                assert(false, "Failure was expected, david should not be able to transfer to self");
            }
            catch (err) {
                assert(err.message.includes("Attempt to transfer to self"), "Should have failed with self owner");
            }
        });

        it("Alice to breed 2 cats from different owners (should fail)", async () => {
            try {
                await kittyContract.breed(kittyId1.toNumber()-1, kittyId3.toNumber()-1, {from: alice}),
                assert(false, "Failure was expected, alice doesn't own both cats");
            }
            catch (err) {
                assert(err.message.includes("Only the owner can breed"), "Should have failed with wrong owner");
            }
        });
    });
});
