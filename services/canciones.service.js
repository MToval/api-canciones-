import Cancion from '../models/cancion.model.js'

async function getCanciones() {
    const data = await Cancion.findAll();
    return data;
}

async function getCancion(id) {
    const data = await Cancion.findByPk(id);
    return data;
}

async function createCancion(body) {
    const data = await Cancion.create(body);
    return data;
}

async function updateCancion(id, body) {
    const cancion = await Cancion.findByPk(id);
    if (!cancion) return null;

    await cancion.update(body);
    return cancion;
}

async function deleteCancion(id) {
    const cancion = await Cancion.findByPk(id);
    if (!cancion) return null;

    await cancion.destroy();
    return true;
}

export default { getCanciones, getCancion, createCancion, updateCancion, deleteCancion }