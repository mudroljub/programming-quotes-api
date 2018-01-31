const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds243285.mlab.com:43285/${process.env.DB_NAME}`

module.exports = {
  mongoUri
}
