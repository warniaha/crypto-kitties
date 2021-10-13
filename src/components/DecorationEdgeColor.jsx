import { decomposeDna, buildDna } from "../js/dna";

function DecorationEdgeColor(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.decorationSidescolor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="decorationEdgeColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Decoration edge color</b>
                    <span className="badge badge-secondary ml-2" id="decorationEdgeName">Code: {dna.decorationSidescolor}</span>
                </label>
                <input type="range" min="10" max="98" className="form-control-range" onChange={onClick} value={dna.decorationSidescolor} />
            </div>
        </div>
    );
}

export default DecorationEdgeColor;
