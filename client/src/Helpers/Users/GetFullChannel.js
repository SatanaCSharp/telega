import Client from '../../Controllers/TelegramController';
import GetAdminedChannels from './GetAdminedChannels';

export default async function GetFullChannel () {
    let { chats } = await GetAdminedChannels();
    const channels = chats.map(async (channel) => {
        const {full_chat} = await Client.call('channels.getFullChannel', {
            channel: {
                _: 'inputChannel',
                channel_id: channel.id,
                access_hash: channel.access_hash
            }
        })
        
        return await {...full_chat, ...channel};
    })
    return await channels 
}