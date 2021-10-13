import { getColor } from '../js/colors';

export const defaultDNA = {
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

export const defaultDnaString = "1013961011131311";

export function decomposeDna(factoryDna) {
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

export function buildDna(dna) {
    var dnaStr = dna.headcolor.toString();
    dnaStr += dna.mouthColor.toString();
    dnaStr += dna.eyesColor.toString();
    dnaStr += dna.earsColor.toString();
    dnaStr += dna.eyesShape.toString();
    dnaStr += dna.decorationPattern.toString();
    dnaStr += dna.decorationMidcolor.toString();
    dnaStr += dna.decorationSidescolor.toString();
    dnaStr += dna.animation.toString();
    dnaStr += dna.lastNum.toString();
    return dnaStr;
}

export function createRandomDna() {
    var dna = {...defaultDNA};
    dna.headcolor = getRandomColor();
    dna.mouthColor = getRandomColor();
    dna.eyesColor = getRandomColor();
    dna.earsColor = getRandomColor();
    dna.decorationMidcolor = getRandomColor();
    dna.decorationSidescolor = getRandomColor();
    dna.eyesShape = getRandomInt(1, 3);
    dna.decorationPattern = getRandomInt(1, 3);
    dna.animation = getRandomInt(1, 4);
    return dna;
}

export function getRandomColor() {
    // gets a color in the range 10..98
    return getRandomInt(10, 98);
}

export function getRandomInt(base, range, rand = Math.random()) {
    return (rand * (range - base) + base).toFixed();
}
