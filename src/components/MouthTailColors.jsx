import { decomposeDna, buildDna } from "../js/dna";

function MouthTailColors(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.mouthColor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="mouthTailColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Mouth, Belly and Tail</b>
                    <span className="badge badge-secondary ml-2" id="mouthTailCode">Code: {dna.mouthColor}</span>
                </label>
                <input type="range" min="10" max="98" className="form-control-range" value={dna.mouthColor} onChange={onClick} />
            </div>
        </div>
    );
}

export default MouthTailColors;
