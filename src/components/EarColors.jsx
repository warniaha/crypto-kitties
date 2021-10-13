import { decomposeDna, buildDna } from "../js/dna";

function EarColors(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.earsColor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="earColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Ears and Paws</b>
                    <span className="badge badge-secondary ml-2" id="earCode">Code: {dna.earsColor}</span>
                </label>
                <input type="range" min="10" max="98" className="form-control-range" value={dna.earsColor} onChange={onClick} />
            </div>
        </div>
    );
}

export default EarColors;
