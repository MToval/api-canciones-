import express from 'express'
import cancionesService from '../services/canciones.service.js'
import verificarToken from '../middlewares/auth.js'

const router = express.Router()

router.get('/', verificarToken, async (req, res) => {
    const canciones = await cancionesService.getCanciones()
    res.send(canciones)
})

router.get('/:id', verificarToken, async (req, res) => {
    const cancion = await cancionesService.getCancion(req.params.id)
    if (!cancion) return res.status(404).send('No encontrada')
    res.send(cancion)
})

router.post('/', verificarToken, async (req, res) => {
    const nueva = await cancionesService.createCancion(req.body)
    res.status(201).send(nueva)
})

router.put('/:id', verificarToken, async (req, res) => {
    const actualizada = await cancionesService.updateCancion(req.params.id, req.body)
    if (!actualizada) return res.status(404).send('No encontrada')
    res.send(actualizada)
})

router.delete('/:id', verificarToken, async (req, res) => {
    const eliminada = await cancionesService.deleteCancion(req.params.id)
    if (!eliminada) return res.status(404).send('No encontrada')
    res.send('Eliminada correctamente')
})

export default router