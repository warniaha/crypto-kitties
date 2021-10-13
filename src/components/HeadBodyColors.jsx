import { decomposeDna, buildDna } from "../js/dna";

function HeadBodyColors(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.headcolor = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }
    
    return (
        <div id="catColors">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Head and body</b>
                    <span className="badge badge-dark ml-2" id="headcode">Code: {dna.headcolor}</span>
                </label>
                <input type="range" min="10" max="98" onChange={onClick} value={dna.headcolor} className="form-control-range" id="bodycolor" />
            </div>
        </div>
    );
}

export default HeadBodyColors;
