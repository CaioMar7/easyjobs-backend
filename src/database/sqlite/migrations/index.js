const sqliteConnection = require("../../sqlite")

const createJobs = require("./createJobs")

async function migrationsRun() {
    const schemas = [
        createJobs
    ].join('')

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun