require('express-async-errors')
const express = require("express")

const routes = require("./routes")

const app = express()
const cors = require("cors")

app.use(express.json())

app.use(routes)
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization']
  }))


const AppError = require("./utils/AppError")
app.use( (error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    
    console.error(error)
    
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const migrationsRun = require("./database/sqlite/migrations")
migrationsRun()

const PORT = 3333
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}!`))