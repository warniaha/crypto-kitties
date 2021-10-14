import { decomposeDna } from "../js/dna";
import { getColor } from '../js/colors';

function Cat(props) {
    const dna = decomposeDna(props.factoryDna);

    const getHeadColorStyle = () => {
        if (dna.headcolor === "88") {
            debugger;
        }
        const headColor = getColor(dna.headcolor);
        console.log(`headColor: ${headColor}`)
        return { "background": `#${headColor}` };
    }

    const getMouthColorStyle = () => {
        return { "background": `#${getColor(dna.mouthColor)}` };
    }

    const getEyeColorStyle = () => {
        const background = { "background": `#${getColor(dna.eyesColor)}` };
        const shape = getEyeShapeStyle(dna.eyesShape);
        return {...background, ...shape};
    }

    const getEarsColorStyle = () => {
        return { "background": `#${getColor(dna.earsColor)}` };
    }

    const getEyeShapeStyle = (num) => {
        switch (num) {
            case 1:
                return { 'border': 'none' };
            case 2:
                return { 'borderTop': '15px solid' };
            case 3:
                return { 'borderBottom': '15px solid' };
            default:
                throw Object.assign(new Error(`Unexpected eye shape: ${num}`), { code: 402 });
        }
    }

    const getDecorationMidStyle = () => {
        const background = { "background": `#${getColor(dna.decorationMidcolor)}` };
        const transform = 
        {
            "transform": "rotate(0deg)",
            "height": "48px",
            "width": "14px",
            "top": "1px",
            "borderRadius": "0 0 50% 50%"
        };
        return { ...background, ...transform };
    }

    const decorationEdge = {
        left: 0, 
        right: 1
    };

    const getDecorationEdgeStyle = (decorationType) => {
        const background = { "background": `#${getColor(dna.decorationSidescolor)}` };
        var rotation;
        var firstBorderRadius;
        var secondBorderRadius;
        switch (dna.decorationPattern) {
            case 1:
                rotation = 0;
                secondBorderRadius = firstBorderRadius = "0 0 50% 50%";
                break;
            case 2:
                rotation = decorationType === decorationEdge.left ? 15 : -15;
                firstBorderRadius = "50% 0 50% 50%";
                secondBorderRadius = "0 50% 50% 50%";
                break;
            case 3:
                rotation = decorationType === decorationEdge.left ? -15 : 15;
                firstBorderRadius = "0 50% 50% 50%";
                secondBorderRadius = "50% 0 50% 50%";
                break;
            default:
                throw Object.assign(new Error(`Unexpected decoration pattern style: ${dna.decorationPattern}`), { code: 402 });
        }
        const transform = 
        {
            "transform": `rotate(${rotation}deg)`,
            "height": "55px",
            "width": "14px",
            "top": "1px",
            "borderRadius": decorationType === decorationEdge.left ? firstBorderRadius : secondBorderRadius,
        };
        return { ...background, ...transform };
    }

    const getRightEarClass = () => {
        var nameOfClass = "cat__ear--right";
        if (dna.animation === 3) {
            nameOfClass += " twitchingEar";
        }
        return nameOfClass;
    }

    const getHeadClass = () => {
        var nameOfClass = "cat__head";
        if (dna.animation === 2) {
            nameOfClass += " movingHead";
        }
        return nameOfClass;
    }

    const getTailClass = () => {
        var nameOfClass = "cat__tail";
        if (dna.animation === 4) {
            nameOfClass += " movingTail";
        }
        return nameOfClass;
    }

    return (
        <div className="cat" style={props.style}>
            <div className="cat__ear">
                <div id="leftEar" className="cat__ear--left"  style={getEarsColorStyle()}>
                    <div className="cat__ear--left-inside"></div>
                </div>
                <div id="rightEar" className={getRightEarClass()} style={getEarsColorStyle()}>
                    <div className="cat__ear--right-inside"></div>
                </div>
            </div>
            <div id="head" className={getHeadClass()} style={getHeadColorStyle()}>
                <div id="midDot" className="cat__head-dots" style={getDecorationMidStyle()}>
                    <div id="leftDot" className="cat__head-dots_first" style={getDecorationEdgeStyle(decorationEdge.left)}></div>
                    <div id="rightDot" className="cat__head-dots_second" style={getDecorationEdgeStyle(decorationEdge.right)}></div>
                </div>
                <div className="cat__eye">
                    <div className="cat__eye--left">
                        <span className="pupil-left" style={getEyeColorStyle()}></span>
                    </div>
                    <div id="winkEye" className="cat__eye--right">
                        <span className="pupil-right" style={getEyeColorStyle()}></span>
                    </div>
                </div>
                <div className="cat__nose"></div>
                <div className="cat__mouth-contour" style={getMouthColorStyle()}></div>
                <div className="cat__mouth-left"></div>
                <div className="cat__mouth-right"></div>
                <div className="cat__whiskers-left"></div>
                <div className="cat__whiskers-right"></div>
            </div>
            <div className="cat__body">
                <div className="cat__chest" style={getHeadColorStyle()}></div>
                <div className="cat__chest_inner" style={getMouthColorStyle()}></div>
                <div className="cat__paw-left" style={getEarsColorStyle()}></div>
                <div className="cat__paw-left_inner" style={getEarsColorStyle()}></div>
                <div className="cat__paw-right" style={getEarsColorStyle()}></div>
                <div className="cat__paw-right_inner" style={getEarsColorStyle()}></div>
                <div id="tail" className={getTailClass()} style={getMouthColorStyle()}></div>
            </div>
        </div>
    );
}

export default Cat;
