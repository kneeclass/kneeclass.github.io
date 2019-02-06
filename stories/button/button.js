import React from 'react';
import './style.scss'

const Button = ({text}) => {

    return (
        <input type="submit" className="button" value={text} />
    );

} 

export default Button;