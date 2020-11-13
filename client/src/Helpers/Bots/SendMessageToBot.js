export default function (username, message) {
    return fetch('', {
        method: 'POST',
        body: {
            username: '@'+username, 
            message
        }
    })
}