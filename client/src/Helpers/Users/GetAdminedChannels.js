import Client from '../../Controllers/TelegramController';

export default  function GetAdminedChannels () {
    return Client.call('channels.getAdminedPublicChannels', {
        by_location: false,
        check_limit: false  
    })
    
}