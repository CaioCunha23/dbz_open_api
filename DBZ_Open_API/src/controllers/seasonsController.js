import Season from '../models/Season.js'

import { Sequelize } from 'sequelize'

async function createSeason(req, res) {
    const { name, number, year, episodes_count } = req.body

    const season = Season.build({ name, number, year, episodes_count })

    try {
        await season.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de temporada inválidas: ' + error.message })
    }

    try {
        await season.save()
        res.status(201).json(season.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar temporada: ' + error.message })
    }
}

async function getSeasons(req, res) {

    try {
        const { name, number, episodes_count, limit, order } = req.query;
        const query = {};

        if (name) {
            query.name = { [Sequelize.Op.like]: `%${name}%` }
        }

        if (episodes_count) {
            query.episodes_count = { [Sequelize.Op.gt]: episodes_count };
        }

        if (number) {
            query.number = number;
        }

        const seasons = await Season.findAll({
            where: query,
            limit,
            order: order ? [[order, 'DESC']] : undefined
        })

        res.json(seasons)

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar temporadas.' + error.message })
    }

}

async function getSeasonById(req, res) {
    const { id } = req.params

    const season = await Season.findByPk(id)

    if (season) {
        res.json(season.toJSON())
    } else {
        res.status(404).json({ error: 'Temporada não encontrada.' })
    }
}

async function updateSeason(req, res) {
    const { id } = req.params
    const { name, number, year, episodes_count } = req.body

    const season = await Season.findByPk(id)

    if (!season) {
        return res.status(404).json({ error: 'Temporada não encontrada.' })
    }

    if (name) season.name = name
    if (number) season.number = number
    if (year) season.year = year
    if (episodes_count) season.episodes_count = episodes_count

    try {
        await season.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de temporada inválidas: ' + error.message })
    }

    try {
        await season.save()
        res.json(season.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar temporada: ' + error.message })
    }
}

async function deleteSeason(req, res) {
    const { id } = req.params

    const season = await Season.findByPk(id)

    if (!season) {
        return res.status(404).json({ error: 'Temporada não encontrada.' })
    }

    try {
        await season.destroy()
        res.json({ message: 'Temporada excluída com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir temporada: ' + error.message })
    }
}

export default {
    createSeason,
    getSeasons,
    getSeasonById,
    updateSeason,
    deleteSeason
}