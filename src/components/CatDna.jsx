import { decomposeDna } from "../js/dna";

function CatDna(props) {
    const dna = decomposeDna(props.factoryDna);
    return (
        <div id="catDNA">
        <b className="dnaDiv">
            DNA:
            {/* <!-- Colors --> */}
            <span id="dnabody">{dna.headcolor}</span>
            <span id="dnamouth">{dna.mouthColor}</span>
            <span id="dnaeyes">{dna.eyesColor}</span>
            <span id="dnaears">{dna.earsColor}</span>

            {/* <!-- Cattributes --> */}
            <span id="dnashape">{dna.eyesShape}</span>
            <span id="dnadecoration">{dna.decorationPattern}</span>
            <span id="dnadecorationMid">{dna.decorationMidcolor}</span>
            <span id="dnadecorationSides">{dna.decorationSidescolor}</span>
            <span id="dnaanimation">{dna.animation}</span>
            <span id="dnaspecial">{dna.lastNum}</span>
        </b>
    </div>
);
}

export default CatDna;
