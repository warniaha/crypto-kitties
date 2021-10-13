import { decomposeDna, buildDna } from "../js/dna";

function DecorationShape(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.decorationPattern = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="decorationShapes">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Decoration shape</b>
                    <span className="badge badge-secondary ml-2" id="decorationShapeName">Code: {dna.decorationPattern}</span>
                </label>
                <input type="range" min="1" max="3" className="form-control-range" onChange={onClick} value={dna.decorationPattern} />
            </div>
        </div>
    );
}

export default DecorationShape;
