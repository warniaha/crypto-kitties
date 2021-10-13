import React from 'react';
import { KittiesContext } from '../KittiesContext';

function Catalog() {
    const {value, setValue} = React.useContext(KittiesContext);
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
