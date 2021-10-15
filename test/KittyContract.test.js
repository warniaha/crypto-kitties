const given = require('mocha-testdata');
const KittyContract = artifacts.require("KittyContract");
const truffleAssert = require("truffle-assertions");
const BigNumber = require('bignumber.js');

contract("KittyContract", accounts => {
    it("Should add a few kitties and transfer one to bob", async () => {
        var kittyContract = await KittyContract.deployed();
        let [alice, bob, chuck, david] = accounts;
        var totalSupply = await kittyContract.totalSupply({from: alice});
        assert.equal(totalSupply.toNumber(), 0, `Total supply should be zero when the tests first start, returned: ${totalSupply.toNumber()}`);
        truffleAssert.passes(await kittyContract.createKittyGen0(new BigNumber("5247984311453321"), {from: alice}));
        var kittyId1 = await kittyContract.totalSupply({from: alice});
        truffleAssert.passes(await kittyContract.createKittyGen0(new BigNumber("1160743022757131"), {from: alice}));
        var kittyId2 = await kittyContract.totalSupply({from: alice});
        totalSupply = await kittyContract.totalSupply({from: alice});
        assert.equal(totalSupply.toNumber(), 2, `Total supply should be two after creating 2 kitties, returned: ${totalSupply.toNumber()}`);
        assert.equal(kittyId1.toNumber()-1, 0, `First kitty should be ID: 0, returned: ${kittyId1.toNumber()}`);
        assert.equal(kittyId2.toNumber()-1, 1, `Second kitty should be ID: 1, returned: ${kittyId2.toNumber()}`);
        truffleAssert.passes(await kittyContract.breed(0, 1, {from: alice}));
        var kittyId3 = await kittyContract.totalSupply({from: alice});
        assert.equal(kittyId3.toNumber()-1, 2, `Newborn kitty should be ID: 2, returned: ${kittyId3.toNumber()}`);
        totalSupply = await kittyContract.totalSupply({from: alice});
        assert.equal(totalSupply.toNumber(), 3, `Total supply should be three after creating 2 kitties and breeding them, returned: ${totalSupply.toNumber()}`);
        var aliceBalance;
        truffleAssert.passes(aliceBalance = await kittyContract.balanceOf(alice, {from: alice}));
        assert.equal(aliceBalance.toNumber(), 3, `Alice should have three kitties, returned: ${aliceBalance.toNumber()}`);
        var bobBalance;
        truffleAssert.passes(bobBalance = await kittyContract.balanceOf(bob, {from: bob}));
        assert.equal(bobBalance.toNumber(), 0, `Bob should have no kitties, returned: ${bobBalance.toNumber()}`);
        truffleAssert.passes(await kittyContract.safeTransferFrom(alice, bob, 2, {from: alice}));
        aliceBalance = await kittyContract.balanceOf(alice, {from: alice});
        assert.equal(aliceBalance.toNumber(), 2, `Alice should have two kitties, returned: ${aliceBalance.toNumber()}`);
        bobBalance = await kittyContract.balanceOf(bob, {from: bob});
        assert.equal(bobBalance.toNumber(), 1, `Bob should have one kitties, returned: ${bobBalance.toNumber()}`);
    });

    given([
        { 
            dna: "5247984311453321", 
            headColor: 52, 
            mouthColor: 47, 
            eyesColor: 98, 
            earsColor: 43, 
            eyesShape: 1, 
            decorationPattern: 1, 
            decorationMidColor: 45, 
            decorationEdgeColor: 33, 
            animation: 2, 
            lastnum: 1
        },
        { 
            dna: "1160743022757131", 
            headColor: 11, 
            mouthColor: 60, 
            eyesColor: 74, 
            earsColor: 30, 
            eyesShape: 2, 
            decorationPattern: 2, 
            decorationMidColor: 75, 
            decorationEdgeColor: 71, 
            animation: 3, 
            lastnum: 1
        },
        { 
            dna: "3875593022721831", 
            headColor: 38, 
            mouthColor: 75, 
            eyesColor: 59, 
            earsColor: 30, 
            eyesShape: 2, 
            decorationPattern: 2, 
            decorationMidColor: 72, 
            decorationEdgeColor: 18, 
            animation: 3, 
            lastnum: 1
        },
        { 
            dna: "3180945321803111", 
            headColor: 31, 
            mouthColor: 80, 
            eyesColor: 94, 
            earsColor: 53, 
            eyesShape: 2, 
            decorationPattern: 1, 
            decorationMidColor: 80, 
            decorationEdgeColor: 31, 
            animation: 1, 
            lastnum: 1
        },
        { 
            dna: "1879852322965841", 
            headColor: 18, 
            mouthColor: 79, 
            eyesColor: 85, 
            earsColor: 23, 
            eyesShape: 2, 
            decorationPattern: 2, 
            decorationMidColor: 96, 
            decorationEdgeColor: 58, 
            animation: 4, 
            lastnum: 1
        },
        { 
            dna: "8839874833182731", 
            headColor: 88, 
            mouthColor: 39, 
            eyesColor: 87, 
            earsColor: 48, 
            eyesShape: 3, 
            decorationPattern: 3, 
            decorationMidColor: 18, 
            decorationEdgeColor: 27, 
            animation: 3, 
            lastnum: 1
        },
        { 
            dna: "2087534233176531", 
            headColor: 20, 
            mouthColor: 87, 
            eyesColor: 53, 
            earsColor: 42, 
            eyesShape: 3, 
            decorationPattern: 3, 
            decorationMidColor: 17, 
            decorationEdgeColor: 65, 
            animation: 3, 
            lastnum: 1
        },
        { 
            dna: "1160743033176531", 
            headColor: 11, 
            mouthColor: 60, 
            eyesColor: 74, 
            earsColor: 30, 
            eyesShape: 3, 
            decorationPattern: 3, 
            decorationMidColor: 17, 
            decorationEdgeColor: 65, 
            animation: 3, 
            lastnum: 1
        },
        { 
            dna: "8839874833176531", 
            headColor: 88, 
            mouthColor: 39, 
            eyesColor: 87, 
            earsColor: 48, 
            eyesShape: 3, 
            decorationPattern: 3, 
            decorationMidColor: 17, 
            decorationEdgeColor: 65, 
            animation: 3, 
            lastnum: 1
        },
    ]).
    it('Should be able to extract the elements from the dna strings', async function ({ dna, headColor, mouthColor,
        eyesColor, earsColor, eyesShape, decorationPattern, decorationMidColor, decorationEdgeColor, animation, lastnum }) {
        var kittyContract = await KittyContract.deployed();
        let [alice, bob, chuck, david] = accounts;
        var head = await kittyContract.extractHeadColor(new BigNumber(dna), {from: alice});
        assert.equal(head.toNumber(), headColor, `Head color doesn't match`);
        var mouth = await kittyContract.extractMouthColor(new BigNumber(dna), {from: alice});
        assert.equal(mouth.toNumber(), mouthColor, `Mouth color doesn't match`);
        var eyes = await kittyContract.extractEyesColor(new BigNumber(dna), {from: alice});
        assert.equal(eyes.toNumber(), eyesColor, `Eye color doesn't match`);
        var ears = await kittyContract.extractEarsColor(new BigNumber(dna), {from: alice});
        assert.equal(ears.toNumber(), earsColor, `Ear color doesn't match`);
        var eyeShape = await kittyContract.extractEyeShape(new BigNumber(dna), {from: alice});
        assert.equal(eyeShape.toNumber(), eyesShape, `Eye shape doesn't match`);
        var decoPat = await kittyContract.extractDecorationPattern(new BigNumber(dna), {from: alice});
        assert.equal(decoPat.toNumber(), decorationPattern, `Decoration pattern doesn't match`);
        var decoMid = await kittyContract.extractDecorationMidColor(new BigNumber(dna), {from: alice});
        assert.equal(decoMid.toNumber(), decorationMidColor, `Decoration mid color doesn't match`);
        var decoEdge = await kittyContract.extractDecorationEdgeColor(new BigNumber(dna), {from: alice});
        assert.equal(decoEdge.toNumber(), decorationEdgeColor, `Decoration edge color doesn't match`);
        var ani = await kittyContract.extractAnimation(new BigNumber(dna), {from: alice});
        assert.equal(ani.toNumber(), animation, `Animation doesn't match`);
        var last = await kittyContract.extractLastnum(new BigNumber(dna), {from: alice});
        assert.equal(last.toNumber(), lastnum, `Lastnum doesn't match`);
    });
});
