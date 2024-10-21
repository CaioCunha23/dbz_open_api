import Character from '../models/Character.js'

import { Sequelize } from 'sequelize'

async function createCharacter(req, res) {
    const { name, role, species, imageUrl } = req.body

    const character = Character.build({ name, role, species, imageUrl })

    try {
        await character.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de personagem inválidas: ' + error.message })
    }

    try {
        await character.save()
        res.status(201).json(character.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar peronsagem: ' + error.message })
    }
}

async function getCharacters(req, res) {
    try {
        const { name, species, role, order, limit = 5, page = 0 } = req.query;
        const query = {};
        const offset = (page - 1) * limit;

        if (name) {
            query.name = { [Sequelize.Op.like]: `%${name}%` }
        }

        if (species) {
            query.species = { [Sequelize.Op.like]: `%${species}%` }
        }

        if (role) {
            query.role = role;
        }

        if (!limit || !page) {
            return res.status(400).json({ error: 'Parâmetros limit e page são obrigatórios' });
        }

        const characters = await Character.findAll({
            where: query,
            order: order ? [[order, 'ASC']] : undefined,
            limit,
            offset
        });

        res.json(characters);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar personagens: ' + error.message })
    }
}

async function getCharacterById(req, res) {
    const { id } = req.params

    const character = await Character.findByPk(id)

    if (character) {
        res.json(character.toJSON())
    } else {
        res.status(404).json({ error: 'Personagem não encontrado' })
    }
}

async function updateCharacter(req, res) {
    const { id } = req.params
    const { name, role, species, imageUrl } = req.body

    const character = await Character.findByPk(id)

    if (!character) {
        return res.status(404).json({ error: 'Personagem não encontrado' })
    }

    if (name) character.name = name
    if (role) character.role = role
    if (species) character.species = species
    if (imageUrl) character.imageUrl = imageUrl

    try {
        await character.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações de personagem inválidas: ' + error.message })
    }

    try {
        await character.save()
        res.json(character.toJSON())
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar personagem: ' + error.message })
    }
}

async function deleteCharacter(req, res) {
    const { id } = req.params

    const character = await Character.findByPk(id)

    if (!character) {
        return res.status(404).json({ error: 'Personagem não encontrado' })
    }

    try {
        await character.destroy()
        res.json({ message: 'Personagem excluído com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir Personagem: ' + error.message })
    }
}

export default {
    createCharacter,
    getCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter
}