export default function (username, message) {
    return fetch('http://localhost:3000/bot/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: '@'+username, 
            message
        })
    })
}