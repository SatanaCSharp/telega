import Client from '../../Controllers/TelegramController';


export default function getUserPhoto({user_id}) {
    return Client.call('photos.getUserPhotos', {
        user_id: '1203596232',
        offset: 0,
        max_id: -1, 
        limit: 1
    });
}