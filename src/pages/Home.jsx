import React from 'react';
import Cat from '../components/Cat'
import { defaultDnaString } from '../js/dna';
import { KittiesContext } from '../KittiesContext';

function Home() {
    const dna1 = "4974533712209821";
    const dna2 = "1872596321315231";
    const dna3 = "9048774123147811";
    const dna4 = "5622158313831931";
    const dna5 = "6823247532223011";
    const dna6 = "9693283622988141";
    const dna7 = "7563452423241931";
    const dna8 = "4491376422504921";

    const getCatTransform = (num) => {
        switch (num) {
            case 1:
                return {
                    'transform': 'rotate(-12deg) scale(0.4)',
                    'marginBottom': '-108px',
                    'marginLeft': '-34px',
                    'zIndex': '1',
                };
            case 2:
                return {
                    'transform': 'rotate(-9deg) scale(0.5)',
                    'marginBottom': '-88px',
                    'marginLeft': '-130px',
                    'zIndex': '2',
                };
            case 3:
                return {
                    'transform': 'rotate(-6deg) scale(0.6)',
                    'marginBottom': '-70px',
                    'marginLeft': '-110px',
                    'zIndex': '3',
                };
            case 4:
                return {
                    'transform': 'rotate(-3deg) scale(0.8)',
                    'marginBottom': '-36px',
                    'marginLeft': '-80px',
                    'zIndex': '4',
                };
            case 5:
                return {
                    'transform': 'rotate(3deg) scale(0.8)',
                    'marginBottom': '-36px',
                    'marginLeft': '-30px',
                    'zIndex': '4',
                };
            case 6:
                return {
                    'transform': 'rotate(6deg) scale(0.6)',
                    'marginBottom': '-70px',
                    'marginLeft': '-80px',
                    'zIndex': '3',
                };
            case 7:
                return {
                    'transform': 'rotate(9deg) scale(0.5)',
                    'marginBottom': '-88px',
                    'marginLeft': '-110px',
                    'zIndex': '2',
                };
            case 8:
                return {
                    'transform': 'rotate(12deg) scale(0.4)',
                    'marginBottom': '-108px',
                    'marginLeft': '-130px',
                    'zIndex': '1',
                };
            default:
                return {
                    'marginLeft': '-30px',
                    'zIndex': '5',
                };
        }

    }

    const { accounts, } = React.useContext(KittiesContext);
    // console.log(`Home: ${JSON.stringify(store)}`);
    return (
        <div className="Home">
            <div className="container p-5">
                <div align="center">
                    <h1 className="c-white">Kitties Home</h1>
                    <p className="c-white">Create and breed your cats</p>
                </div>
            </div>
            <div className="container p-9 listCats">
                <Cat factoryDna={dna1} style={getCatTransform(1)}/>
                <Cat factoryDna={dna2} style={getCatTransform(2)}/>
                <Cat factoryDna={dna3} style={getCatTransform(3)}/>
                <Cat factoryDna={dna4} style={getCatTransform(4)}/>
                <Cat factoryDna={defaultDnaString} style={getCatTransform(0)}/>
                <Cat factoryDna={dna5} style={getCatTransform(5)}/>
                <Cat factoryDna={dna6} style={getCatTransform(6)}/>
                <Cat factoryDna={dna7} style={getCatTransform(7)}/>
                <Cat factoryDna={dna8} style={getCatTransform(8)}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>KittyContext: {accounts}</div>
        </div>
    )
}

export default Home;
