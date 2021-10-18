import { decomposeDna } from "../js/dna";
import { getColor } from '../js/colors';

const sideWise = {
    left: 0, 
    right: 1,
    none: 2,
};

const animationType = {
    none: 1,
    head: 2,
    ear: 3,
    tail: 4,
};

const decorationPatternType = {
    none: 1,
    slick: 2,
    mean: 3,
};

const eyeShapeType = {
    normal: 1,
    chill: 2,
    lookingUp: 3,
};

const animationEarSide = {
    left: 0,
    right: 1,
    both: 2,
};

function Cat(props) {
    const dna = decomposeDna(props.factoryDna);

    const getHeadColorStyle = () => {
        return { "background": `#${getColor(dna.headcolor)}` };
    }

    const getMouthColorStyle = () => {
        return { "background": `#${getColor(dna.mouthColor)}` };
    }

    const getEyeColorStyle = () => {
        const background = { "background": `#${getColor(dna.eyesColor)}` };
        const shape = getEyeShapeStyle(dna.eyesShape);
        return {...background, ...shape};
    }

    const getEarsStyle = (side) => {
        var animation;
        if (dna.animation === animationType.ear) {
            if (side === sideWise.right) {
                const duration = 1 / ((getAnimationModifier() % 10) + 1);
                console.log(`right duration: ${duration} ${getAnimationModifier()} ${(getAnimationModifier() % 10) + 1}`)
                animation = { "animation": `earTwitch ${1.6 + duration}s infinite`};
            }
        }
        const background = { "background": `#${getColor(dna.earsColor)}` };
        return  { ...background, ...animation };
    }
    
    const getEyeShapeStyle = (num) => {
        switch (num) {
            case eyeShapeType.normal:
                return { 'border': 'none' };
            case eyeShapeType.chill:
                return { 'borderTop': '15px solid' };
            case eyeShapeType.lookingUp:
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

    const getDecorationEdgeStyle = (decorationType) => {
        const background = { "background": `#${getColor(dna.decorationSidescolor)}` };
        var rotation;
        var firstBorderRadius;
        var secondBorderRadius;
        switch (dna.decorationPattern) {
            case decorationPatternType.none:
                rotation = 0;
                secondBorderRadius = firstBorderRadius = "0 0 50% 50%";
                break;
            case decorationPatternType.slick:
                rotation = decorationType === sideWise.left ? 15 : -15;
                firstBorderRadius = "50% 0 50% 50%";
                secondBorderRadius = "0 50% 50% 50%";
                break;
            case decorationPatternType.mean:
                rotation = decorationType === sideWise.left ? -15 : 15;
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
            "borderRadius": decorationType === sideWise.left ? firstBorderRadius : secondBorderRadius,
        };
        return { ...background, ...transform };
    }

    const getAnimationModifier = () => {
        return dna.headcolor + dna.mouthColor + dna.eyesColor + dna.earsColor;
    }

    const getHeadClass = () => {
        var nameOfClass = "cat__head";
        if (dna.animation === animationType.head) {
            nameOfClass += " movingHead" + (getAnimationModifier() % 7);
        }
        return nameOfClass;
    }

    const getTailClass = () => {
        var nameOfClass = "cat__tail";
        if (dna.animation === animationType.tail) {
            nameOfClass += " movingTail" + (getAnimationModifier() % 5);
        }
        return nameOfClass;
    }

    return (
        <div className="cat" style={props.style}>
            <div className="cat__ear">
                <div id="leftEar" className="cat__ear--left"  style={getEarsStyle(sideWise.left)}>
                    <div className="cat__ear--left-inside"></div>
                </div>
                <div id="rightEar" className="cat__ear--right" style={getEarsStyle(sideWise.right)}>
                    <div className="cat__ear--right-inside"></div>
                </div>
            </div>
            <div id="head" className={getHeadClass()} style={getHeadColorStyle()}>
                <div id="midDot" className="cat__head-dots" style={getDecorationMidStyle()}>
                    <div id="leftDot" className="cat__head-dots_first" style={getDecorationEdgeStyle(sideWise.left)}></div>
                    <div id="rightDot" className="cat__head-dots_second" style={getDecorationEdgeStyle(sideWise.right)}></div>
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
                <div className="cat__paw-left" style={getEarsStyle(sideWise.none)}></div>
                <div className="cat__paw-left_inner" style={getEarsStyle(sideWise.none)}></div>
                <div className="cat__paw-right" style={getEarsStyle(sideWise.none)}></div>
                <div className="cat__paw-right_inner" style={getEarsStyle(sideWise.none)}></div>
                <div id="tail" className={getTailClass()} style={getMouthColorStyle()}></div>
            </div>
        </div>
    );
}

export default Cat;
