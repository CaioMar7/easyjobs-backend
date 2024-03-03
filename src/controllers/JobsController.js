const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class JobsController {
    async create(request, response) {
        const database = await sqliteConnection()

        const {
            cnpj,
            name,
            email,
            salary,
            locate,
            journey,
            type,
            description,
            required,
            benefits
        } = request.body


        if (!cnpj) {
            throw new AppError("O campo CNPJ é obrigatório!")
        }
        if (!name) {
            throw new AppError("O campo CARGO é obrigatório!")
        }
        if (!email) {
            throw new AppError("O campo EMAIL é obrigatório!")
        }
        if (!salary) {
            throw new AppError("O campo SALARIO é obrigatório!")
        }
        if (!locate) {
            throw new AppError("O campo LOCALIZAÇÃO é obrigatório!")
        }
        if (!journey) {
            throw new AppError("O campo JORNADA é obrigatório!")
        }
        if (!type) {
            throw new AppError("O campo TIPO é obrigatório!")
        }

        await database.run("INSERT INTO jobs (cnpj, name, email, salary, locate, journey, type, description, required) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [cnpj, name, email, salary, locate, journey, type, description, required])

        return response.json({ "message": "Post criado com sucesso!" })
    }

    async show(request, response) {
        const { id } = request.params

        const database = await sqliteConnection()

        const checkJobExists = await database.get("SELECT * FROM jobs WHERE id = (?)", [id])

        const checkBenefits = await database.all("SELECT * FROM benefits WHERE job_id = (?)", [id])

        console.log(checkBenefits)

        if (!checkJobExists) {
            throw new AppError("Essa vaga não foi encontrada!")
        }

        return response.status(200).json({...checkJobExists, benefits: checkBenefits})
    }

    async index(request, response) {
        const database = await sqliteConnection()

        const jobs = await database.all("SELECT * FROM jobs")

        const jobsWithBenefits = await Promise.all(jobs.map(async (job) => {
            try {
                const getBenefits = await database.all("SELECT * FROM benefits WHERE job_id = (?)", [job.id])
                return {...job, benefits: getBenefits}
            } catch(error) {
                console.log(error.message)
                return {...job, benefits: []}
            }
        }))

        console.log(jobsWithBenefits)
        
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response.status(200).json(jobsWithBenefits)
    }

    async update(request, response) {
        const { id } = request.params

        const {
            cnpj,
            name,
            email,
            salary,
            locate,
            journey,
            type,
            description,
            required,
            benefits
        } = request.body

        const database = await sqliteConnection()
        const findJob = await database.get("SELECT * FROM jobs WHERE id = (?)", [id])

        if (!findJob) {
            throw new AppError("Essa vaga não foi encontrada!")
        }

        findJob.cnpj = cnpj ?? findJob.cnpj
        findJob.name = name ?? findJob.name
        findJob.email = email ?? findJob.email
        findJob.salary = salary ?? findJob.salary
        findJob.locate = locate ?? findJob.locate
        findJob.journey = journey ?? findJob.journey
        findJob.type = type ?? findJob.type
        findJob.description = description ?? findJob.description
        findJob.required = required ?? findJob.required
        findJob.benefits = benefits ?? findJob.benefits

        await database.run(`
            UPDATE jobs SET
            cnpj = ?,
            name = ?,
            email = ?,
            salary = ?,
            locate = ?,
            journey = ?,
            type = ?,
            description = ?,
            required = ?,
            benefits = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [findJob.cnpj, findJob.name, findJob.email, findJob.salary, findJob.locate, findJob.journey, findJob.type, findJob.description, findJob.required, findJob.benefits, id])

        return response.status(200).json("Alterações realizadas!")
    }

    async desativate(request, response) {
        const database = await sqliteConnection()

        const { id } = request.params

        const findJob = await database.get("SELECT * FROM jobs WHERE id = (?)", [id])

        if (!findJob) {
            throw new AppError("Essa vaga não foi encontrada!")
        }

        if (findJob.status == 0) {
            throw new AppError("Essa vaga já está desativada!")
        }

        await database.run(`
            UPDATE jobs SET
            status = 0
            WHERE id = ?`,
            id)

        return response.status(200).json(`A vaga de ${findJob.name} id ${findJob.id} foi desativada!`)
    }

}

module.exports = JobsController
