import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/database.db'
})

try {
    await sequelize.authenticate()
    console.log('Conexão estabelecida com sucesso.')
} catch (error) {
    console.log('Não foi possível conectar ao banco de dados: ', error.message)
}

export default sequelize