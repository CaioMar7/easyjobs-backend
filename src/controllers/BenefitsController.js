const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class BenefitsController {
    async create(request, response) {
        const database = await sqliteConnection()

        const { id } = request.params

        const {
            name,
        } = request.body

        const findJob = await database.get("SELECT * FROM jobs WHERE id = (?)", [id])

        if (!findJob) {
            throw new AppError("Essa vaga não foi encontrada!")
        }

        await database.run(`INSERT INTO benefits (name, job_id) VALUES (?, ?)`, [name, id])

        return response.status(200).json({name, id})
    }

    async show(request, response) {
        const database = await sqliteConnection()

        const { id } = request.params

        const findBenefit = await database.get("SELECT * FROM benefits WHERE id = (?)", [id])

        if (!findBenefit) {
            throw new AppError("Esse benefício não foi encontrado!")
        }

        return response.status(200).json(findBenefit)
    }

    async index(request, response) {
        const database = await sqliteConnection()

        const { id } = request.params

        const findBenefit = await database.all("SELECT * FROM benefits") 

        return response.status(200).json(findBenefit)
    }

}

module.exports = BenefitsController
