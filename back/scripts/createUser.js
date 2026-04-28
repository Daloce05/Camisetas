require('dotenv').config();
const { User } = require('../models');

async function createUser() {
  try {
    const user = await User.create({
      nombre: 'Daloce05',
      apellido: 'Daloce05',
      email: 'Daloce05@correo.com',
      password: 'Daloce05',
      rol: 'cliente',
      telefono: '',
      activo: true
    });
    console.log('Usuario creado:', user.email);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

createUser();
