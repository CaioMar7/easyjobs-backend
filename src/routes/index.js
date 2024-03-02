const { Router } = require("express")

const jobsRoutes = require("./jobs.routes")
const benefitsRoutes = require("./benefits.routes")

const routes = Router()

routes.use("/jobs", jobsRoutes)
routes.use("/benefits", benefitsRoutes)

module.exports = routes