import pgPromise from 'pg-promise'

const pgp = pgPromise({})

const db = pgp({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'parking'

})

export default db