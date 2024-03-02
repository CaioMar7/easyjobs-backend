const createJobs = `

    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cnpj INTEGER NOT NULL,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        salary INTEGER NOT NULL,
        locate VARCHAR NOT NULL,
        journey VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        description VARCHAR,
        required VARCHAR,
        status INTEGER DEFAULT "1",
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

`

module.exports = createJobs