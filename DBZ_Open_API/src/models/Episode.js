import { Sequelize } from 'sequelize'

import database from '../db/database.js'

export const Episode = database.define('episode', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
})

export default Episode