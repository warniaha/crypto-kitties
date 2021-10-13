import React from 'react';
import { UserContext } from '../UserContext';

function Home() {
    const {value, setValue} = React.useContext(UserContext);
    return (
        <div className="Home">
            <h2>Home page</h2>
            <div>
                {value}
            </div>
        </div>
    )
}

export default Home;
