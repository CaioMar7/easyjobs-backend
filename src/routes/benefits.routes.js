const { Router } = require("express")

const BenefitsController = require("../controllers/BenefitsController")

const benefitsRoutes = Router()

const benefitsController = new BenefitsController()

benefitsRoutes.post("/:id", benefitsController.create)
benefitsRoutes.get("/:id", benefitsController.show)
benefitsRoutes.get("/", benefitsController.index)
benefitsRoutes.delete("/:id", benefitsController.delete)

module.exports = benefitsRoutes