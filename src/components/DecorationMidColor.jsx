import { decomposeDna, buildDna } from "../js/dna";

function DecorationMidColor(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.decorationMidcolor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="decorationMidColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Decoration middle color</b>
                    <span className="badge badge-secondary ml-2" id="decorationMidName">Code: {dna.decorationMidcolor}</span>
                </label>
                <input type="range" min="10" max="98" className="form-control-range" onChange={onClick} value={dna.decorationMidcolor} />
            </div>
        </div>
    );
}

export default DecorationMidColor;
