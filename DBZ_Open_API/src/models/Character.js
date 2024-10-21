import { Sequelize } from 'sequelize'

import database from '../db/database.js'

export const Character = database.define('character', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    species: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

export default Character