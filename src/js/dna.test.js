import { defaultDnaString, defaultDNA, buildDna, decomposeDna} from './dna';

it("Should be able to build a dna object", () => {
    const dna = buildDna(defaultDNA);
    expect(dna).toEqual(defaultDnaString);
});

it("should be able to decompose a dna string", () => {
    const dna = decomposeDna(defaultDnaString);
    expect(dna.headcolor).toEqual(10);
    expect(dna.mouthColor).toEqual(13);
    expect(dna.eyesColor).toEqual(96);
    expect(dna.earsColor).toEqual(10);
    expect(dna.eyesShape).toEqual(1);
    expect(dna.decorationPattern).toEqual(1);
    expect(dna.decorationMidcolor).toEqual(13);
    expect(dna.decorationSidescolor).toEqual(13);
    expect(dna.animation).toEqual(1);
    expect(dna.lastNum).toEqual(1);
})