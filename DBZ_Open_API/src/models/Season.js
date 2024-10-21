import { Sequelize } from 'sequelize'

import database from '../db/database.js'

export const Season = database.define('season', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    episodes_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Season