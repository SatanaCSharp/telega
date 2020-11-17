export default function ({username}) {
    return fetch('http://localhost:3005/bot/get_bot_presence', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: '@'+username
        })
    })
}
