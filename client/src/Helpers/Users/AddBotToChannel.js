import Client from '../../Controllers/TelegramController';

export default function (channel) {
    console.log('add bot to channel');
    return Client.call('channels.editAdmin', {
        channel: {
            "_": "inputChannel",
            channel_id: channel.id,
            access_hash: channel.access_hash
        },
        user_id: {
            "_": "inputUser",
            user_id: 1341800319,
            access_hash: "929551402302952577"
        },
        admin_rights: {
            "_": "chatAdminRights",
            change_info: true,
            post_messages: true,
            edit_messages: true,
            delete_messages: true,
            ban_users: true,
            invite_users: true,
            pin_messages: true,
            add_admins: true
        },
        rank: "Bot"
    })
}