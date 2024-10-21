import Episode from '../models/Episode.js'
import Season from '../models/Season.js'

import { Sequelize } from 'sequelize'

async function createEpisode(req, res) {
    const { season_id } = req.params
    const { title, duration, rating } = req.body

    const season = await Season.findByPk(season_id)

    if (!season) {
        return res.status(404).json({ error: 'Temporada não encontrada' })
    }

    const episode = await Episode.build({ title, duration, season_id, rating })

    try {
        await episode.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de episódio inválidas: ' + error.message })
    }

    try {
        await episode.save()
        res.status(201).json(episode.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar episódio: ' + error.message })
    }
}

async function getEpisodes(req, res) {
    try {
        const { title, rating, limit = 5, order, page = 0 } = req.query;
        const query = {};
        const offset = (page - 1) * limit;

        if (title) {
            query.title = { [Sequelize.Op.like]: `%${title}%` }
        }

        if (rating) {
            query.rating = { [Sequelize.Op.gt]: rating };
        }

        if (!limit || !page) {
            return res.status(400).json({ error: 'Parâmetros limit e page são obrigatórios' });
        }

        const episodes = await Episode.findAll({
            where: query,
            limit,
            offset,
            order: order ? [[order, 'ASC']] : undefined
        });

        res.json(episodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar episódios' });
    }
}

async function getEpisodeById(req, res) {
    const { id } = req.params

    const episode = await Episode.findByPk(id)

    if (episode) {
        res.json(episode.toJSON())
    } else {
        res.status(404).json({ error: 'Episódio não encontrado.' })
    }
}

async function getEpisodesBySeasonId(req, res) {
    const { season_id } = req.params

    const season = await Season.findByPk(season_id, { include: 'episodes' })

    if (!season) {
        res.status(404).json({ error: 'Temporada não encontrada.' })
    }

    const episodes = season.episodes

    res.json(episodes)
}

async function updateEpisode(req, res) {
    const { id } = req.params
    const { title, duration, rating } = req.body

    const episode = await Episode.findByPk(id)

    if (!episode) {
        return res.status(404).json({ error: 'Episódio não encontrado.' })
    }

    if (title) episode.title = title
    if (duration) episode.duration = duration
    if (rating) episode.rating = rating

    try {
        await episode.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de episódio inválidas: ' + error.message })
    }

    try {
        await episode.save()
        res.json(episode.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar episódio: ' + error.message })
    }
}

async function deleteEpisode(req, res) {
    const { id } = req.params

    const episode = await Episode.findByPk(id)

    if (!episode) {
        return res.status(404).json({ error: 'Episódio não encontrado.' })
    }

    try {
        await episode.destroy()
        res.json({ message: 'Episódio excluído com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir episódio: ' + error.message })
    }
}

export default {
    createEpisode,
    getEpisodes,
    getEpisodeById,
    getEpisodesBySeasonId,
    updateEpisode,
    deleteEpisode
}