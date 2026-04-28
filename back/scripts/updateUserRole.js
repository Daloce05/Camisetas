require('dotenv').config();
const { User } = require('../models');

async function updateUserRole() {
  try {
    const user = await User.findOne({ where: { email: 'Daloce05@correo.com' } });
    if (!user) {
      console.log('Usuario no encontrado.');
      return;
    }
    user.rol = 'admin';
    await user.save();
    console.log('Rol actualizado a admin para:', user.email);
  } catch (error) {
    console.error('Error al actualizar rol:', error);
  }
}

updateUserRole();
