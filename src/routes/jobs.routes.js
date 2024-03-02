const { Router } = require("express")

const JobsController = require("../controllers/JobsController")

const jobsRoutes = Router()

const jobsController = new JobsController()

jobsRoutes.get("/", jobsController.index)
jobsRoutes.get("/:id", jobsController.show)
jobsRoutes.post("/", jobsController.create)
jobsRoutes.put("/:id", jobsController.update)
jobsRoutes.put("/desativate/:id", jobsController.desativate)


module.exports = jobsRoutes