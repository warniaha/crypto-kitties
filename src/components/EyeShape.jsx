import { decomposeDna, buildDna } from "../js/dna";

function EyeShape(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.eyesShape = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    const getShapeDescription = (num) => {
        switch (num) {
            case 1:
                return 'Basic';
            case 2:
                return 'Chill';
            case 3:
                return 'Looking up';
            default:
                throw Object.assign(new Error(`Unexpected eye shape: ${num}`), { code: 402 });
            }
    }
 
    return (
        <div id="eyesShapes">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Eye shape</b>
                    <span className="badge badge-secondary ml-2" id="eyeName">{getShapeDescription(dna.eyesShape)}</span>
                </label>
                <input type="range" min="1" max="3" className="form-control-range" onChange={onClick} value={dna.eyesShape} />
            </div>
        </div>
    );
}

export default EyeShape;
