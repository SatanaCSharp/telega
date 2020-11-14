import React from 'react';
import ChannelOwnerDashboard from './ChannelOwnerDashboard/ChannelOwnerDashboard';
import AdvertiserDashboard from '../../Containers/Advertiser/AdvertiserDashboard';


const styles = {
    layout: {
        display: 'flex',
        width: '80vw', 
        
        justifyContent: 'center',
        marginTop: '20px',
        flexDirection: 'column',
    }
}

export default function Dashboard (props) {
    return (
        <div style={styles.layout}>
            {
                props.userType ?
                    <ChannelOwnerDashboard /> :
                    <AdvertiserDashboard />
            }
        </div>
    )
}