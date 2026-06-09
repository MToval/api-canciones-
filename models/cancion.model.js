import { DataTypes } from 'sequelize'
import db from './db.js'

const Cancion = db.define('Cancion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracion: {
        type: DataTypes.INTEGER
    },
    artista: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    popularidad: {
        type: DataTypes.INTEGER
    }
})

export default Cancion