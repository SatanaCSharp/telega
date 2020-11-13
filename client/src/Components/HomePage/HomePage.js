import React, { useState, useEffect } from 'react';
import GetFullChannel from '../../Helpers/Users/GetFullChannel';
import GetChannels from '../../Helpers/Users/GetAdminedChannels';

export default function HomePage (props) {
    const [channels, setChannels] = useState([]);
    
    useEffect(() => {
        GetFullChannel().then(channels => console.log(Promise.all(channels).then(channels =>setChannels(channels))));    
    }, [])
    
    return (
        <div>
            <p>Home Page</p>
        </div>
    )
}