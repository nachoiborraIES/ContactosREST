const express = require('express');

let Contacto = require(__dirname + '/../models/contacto.js');
let router = express.Router();

// Servicio de listado general
router.get('/', async (req, res) => {
    try
    {
        let resultado = await Contacto.find();
        res.status(200)
           .send({ ok: true, resultado: resultado });
    } catch (error) {
        res.status(500)
           .send({ ok: false, error: "Error obteniendo contactos"});
    } 
});

// Servicio de listado por id
router.get('/:id', async (req, res) => {
    try
    {
        let resultado = await Contacto.findById(req.params.id);
        if(resultado)
            res.status(200).send({ ok: true, resultado: resultado });
        else
            res.status(400).send({ ok: false, error: "No se han encontrado contactos" });
    } catch (error) {
        res.status(400).send({ ok: false, error: "Error buscando el contacto indicado" });
    } 
});

// Servicio para insertar contactos
router.post('/', async (req, res) => {

    try
    {
        let nuevoContacto = new Contacto({
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            edad: req.body.edad
        });
        
        let resultado = await nuevoContacto.save();
        res.status(200).send({ok: true, resultado: resultado});
    } catch(error) {
        res.status(400).send({ok: false, error: "Error añadiendo contacto"});
    }
});

// Servicio para modificar contactos
router.put('/:id', async (req, res) => {
    try
    {
        let resultado = await Contacto.findByIdAndUpdate(req.params.id, {
            $set: {
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                edad: req.body.edad
            }
        }, {returnDocument: 'after'});
        if (resultado)
            res.status(200).send({ok: true, resultado: resultado});
        else
            res.status(400).send({ok: false, error: "Contacto no encontrado"});
    } catch(error) {
        res.status(400).send({ok: false, error:"Error actualizando contacto"});
    }
});

// Servicio para borrar contactos
router.delete('/:id', async (req, res) => {
    try
    {
        let resultado = await Contacto.findByIdAndDelete(req.params.id);
        if (resultado)
            res.status(200).send({ok: true, resultado: resultado});
        else
            res.status(400).send({ok: false, error: "Contacto no encontrado"});
    } catch(error) {
        res.status(400).send({ok: false, error:"Error eliminando contacto"});
    }
});

module.exports = router;