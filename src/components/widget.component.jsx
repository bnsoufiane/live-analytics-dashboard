import React from 'react';

export const Widget = (props) => {
    const {name, value} = props;
    return <div>
        {name}: {value}
    </div>
}
