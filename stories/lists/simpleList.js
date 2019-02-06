import React from 'react';

const SimpleList = ({listItems}) => {
 
    const items = listItems.map(function(i){
        return <li>{i.name}</li>
    })

    return <ul>
        {items}
    </ul>

}

export default SimpleList;