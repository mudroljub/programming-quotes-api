const broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN)
      client.send(data)
  })
}

module.exports = broadcast
