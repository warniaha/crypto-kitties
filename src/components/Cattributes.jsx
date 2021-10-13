import HeadBodyColors from './HeadBodyColors';
import MouthTailColors from './MouthTailColors';
import EyeColors from './EyeColors';
import EarColors from './EarColors';
import EyeShape from './EyeShape';
import DecorationShape from './DecorationShape';
import DecorationMidColor from './DecorationMidColor';
import DecorationEdgeColor from './DecorationEdgeColor';
import CatAnimations from './CatAnimations';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Cattributes(props) {
    const factoryDna = props.factoryDna;
    return (
        <div className="col-lg-7 cattributes m-2 light-b-shadow">
            <Tabs>
                <TabList>
                    <Tab>Colors</Tab>
                    <Tab>Attributes</Tab>
                </TabList>

                <TabPanel>
                    <HeadBodyColors setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    <MouthTailColors setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    <EyeColors setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    <EarColors setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                </TabPanel>
                <TabPanel>
                    <EyeShape setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    <DecorationShape setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    <div className="decorationColorsDiv">
                        <DecorationMidColor setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                        <DecorationEdgeColor setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                    </div>
                    <CatAnimations setFactoryDna={props.setFactoryDna} factoryDna={factoryDna} />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Cattributes;
