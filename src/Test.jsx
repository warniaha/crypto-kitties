import React from 'react';
import { UserContext } from './UserContext';

function Test() {
    const {value, setValue} = React.useContext(UserContext);
    return (
        <div className="Test">
            <h2>Test page</h2>
            <div>
                {value}
            </div>
        </div>
    )
}

export default Test;
