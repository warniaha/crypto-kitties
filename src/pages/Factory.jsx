import React from 'react';
import { UserContext } from '../UserContext';

function Factory() {
    const {value, setValue} = React.useContext(UserContext);
    const onClick = (event) => {
        event.preventDefault();
        setValue("Value has been changed");
    }
    return (
        <div className="Factory">
            <h2>Factory page</h2>
            <div>
                {value}
            </div>
            <button onClick={onClick}>Change context</button>
        </div>
    )
}

export default Factory;
