import { decomposeDna, buildDna } from "../js/dna";

function CatAnimations(props) {
    const dna = decomposeDna(props.factoryDna);

    const onClick = (event) => {
        var newDna = dna;
        newDna.animation = (typeof(event.target.value) === 'string') ? parseInt(event.target.value) : event.target.value;
        const dnaStr = buildDna(newDna);
        props.setFactoryDna(dnaStr);
    }

    const getAnimationName = () => {
        switch (dna.animation) {
            case 1:
                return 'None';
            case 2:
                return 'Head';
            case 3:
                return 'Twitch ear';
            case 4:
                return 'Tail';
            default:
                throw Object.assign(new Error(`Unexpected animation type: ${dna.animation}`), { code: 402 });
        }
    }

    return (
        <div id="animations">
            <div className="form-group">
                <label htmlFor="formControlRange">
                    <b>Animations</b>
                    <span className="badge badge-secondary ml-2" id="animationName">{getAnimationName()}</span>
                </label>
                <input type="range" min="1" max="4" className="form-control-range" onChange={onClick} value={dna.animation} />
            </div>
        </div>
    );
}

export default CatAnimations;
