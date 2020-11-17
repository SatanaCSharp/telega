import Client from '../../Controllers/TelegramController';

export default function ({id, access_hash}, {message_id}) {
    return Client.call('channels.getMessages', {
        channel: {
            "_": "inputChannel",
            channel_id: id,
            access_hash
        },
        id: [
            {
                "_": "inputMessageID",
                id: message_id
            }
        ]
    });
}