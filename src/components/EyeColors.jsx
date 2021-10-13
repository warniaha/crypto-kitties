import { decomposeDna, buildDna } from "../js/dna";

function EyeColors(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.eyesColor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="eyeColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Eyes</b>
                    <span className="badge badge-secondary ml-2" id="eyeCode">Code: {dna.eyesColor}</span>
                </label>
                <input type="range" min="10" max="98" className="form-control-range" value={dna.eyesColor} onChange={onClick} />
            </div>
        </div>
    );
}

export default EyeColors;
