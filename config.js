const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds117178.mlab.com:17178/${process.env.DB_NAME}`

module.exports = {
  mongoUri
}
