import React from 'react';
import { UserContext } from '../UserContext';

function Catalog() {
    const {value, setValue} = React.useContext(UserContext);
    return (
        <div className="Catalog">
            <h2>Catalog page</h2>
            <div>
                {value}
            </div>
        </div>
    )
}

export default Catalog;
