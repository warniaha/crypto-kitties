import React from 'react';
import { UserContext } from './UserContext';

function About() {
    const {value, setValue} = React.useContext(UserContext);
    const onClick = (event) => {
        event.preventDefault();
        setValue("Value has been changed");
    }
    return (
        <div className="About">
            <h2>About page</h2>
            <div>
                {value}
            </div>
            <button onClick={onClick}>Change context</button>
        </div>
    )
}

export default About;
