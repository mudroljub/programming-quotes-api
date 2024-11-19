const { DB_USER, DB_PASSWORD, DB_DOMAIN, DB_NAME } = process.env

const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}/${DB_NAME}`

export { mongoUri }
