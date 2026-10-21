const express = require('express');

let Mascota = require(__dirname + '/../models/mascota.js');
let router = express.Router();

// Servicio de listado
router.get('/', async (req, res) => {
    try
    {
        let resultado = await Mascota.find();
        res.status(200).send({ok: true, resultado: resultado});
    } catch (error) {
        res.status(500).send({ok: false, error: "Error obteniendo mascotas"});
    }
});

// Servicio de inserción
router.post('/', async(req, res) => {
    try
    {
        let nuevaMascota = new Mascota({
            nombre: req.body.nombre,
            tipo: req.body.tipo
        });

        let resultado = await nuevaMascota.save();
        res.status(200).send({ok: true, resultado: resultado});
    } catch(error) {
        res.status(400).send({ok: false, error: "Error añadiendo mascota"});
    }
});

// Servicio de borrado
router.delete('/:id', async (req,res) => {
    try
    {
        let resultado = await Mascota.findByIdAndDelete(req.params['id']);
        if (resultado)
            res.status(200).send({ok: true, resultado: resultado});
        else
            res.status(400).send({ok: false, error: "Mascota no encontrada"});
    } catch(error) {
        res.status(400).send({ok: false, error: "Error borrando mascota"});
    }
});

module.exports = router;