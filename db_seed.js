require('dotenv').config();
const mongoose = require('mongoose');

const Contacto = require(__dirname + '/models/contacto');
const Mascota = require(__dirname + '/models/mascota');
const Restaurante = require(__dirname + '/models/restaurante');

async function seedDB() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('No se ha encontrado la variable MONGODB_URI en el fichero .env');
        }

        await mongoose.connect(mongoURI);
        console.log('Conectado a MongoDB');

        // Limpiar las colecciones existentes para evitar duplicados
        await Contacto.deleteMany({});
        await Mascota.deleteMany({});
        await Restaurante.deleteMany({});
        console.log('Colecciones limpiadas correctamente');

        // Crear Restaurantes de prueba
        const rest1 = await Restaurante.create({
            nombre: 'La Parrilla de Juan',
            direccion: 'Calle Mayor 12, Madrid',
            telefono: '912345678'
        });

        const rest2 = await Restaurante.create({
            nombre: 'Sushi Zen',
            direccion: 'Avenida de la Paz 45, Barcelona',
            telefono: '933445566'
        });

        // Crear Mascotas de prueba
        const mascota1 = await Mascota.create({
            nombre: 'Firulais',
            tipo: 'perro'
        });

        const mascota2 = await Mascota.create({
            nombre: 'Michi',
            tipo: 'gato'
        });

        const mascota3 = await Mascota.create({
            nombre: 'Nemo',
            tipo: 'otros'
        });

        // Crear Contactos de prueba con diferentes combinaciones de relaciones
        await Contacto.create([
            {
                nombre: 'Ana Gómez',
                telefono: '611223344',
                edad: 28,
                restauranteFavorito: rest1._id,
                mascotas: [mascota1._id, mascota2._id]
            },
            {
                nombre: 'Carlos Pérez',
                telefono: '622334455',
                edad: 35,
                restauranteFavorito: rest2._id,
                mascotas: [mascota3._id]
            },
            {
                nombre: 'Elena Ruiz',
                telefono: '633445566',
                edad: 42,
                mascotas: []
            }
        ]);

        console.log('Base de datos poblada con éxito');

    } catch (error) {
        console.error('Error durante el proceso de seeding:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión cerrada.');
    }
}

seedDB();