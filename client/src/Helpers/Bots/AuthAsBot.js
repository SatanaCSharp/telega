import Client from '../../Controllers/TelegramController';

export default function AuthAsBot () {
    return Client.call('auth.importBotAuthorization', {
        app_id: '1833242',
        api_hash: '1f3f3191040d421edfd049c8c3ff0d6d',
        bot_auth_token: '1341800319:AAH6NuRbm2RmnNA9EJnzUId7EttFd7jFwi4'
    })
}