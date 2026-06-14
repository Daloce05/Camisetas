require('dotenv').config();
const { sequelize } = require('../config/database');
const { User, Category, Product, Setting } = require('../models');
const bcrypt = require('bcryptjs');

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida.');

    await sequelize.sync({ force: true });
    console.log('Tablas creadas.');

    // Crear admin por defecto
    const salt = await bcrypt.genSalt(10);
    await User.create({
      nombre: 'Admin',
      apellido: 'Camisetas',
      email: 'admin@camisetas.com',
      password: 'admin123',
      rol: 'admin',
      telefono: '0000000000',
      activo: true
    });

    // Crear categorías iniciales
    const categorias = await Category.bulkCreate([
      { nombre: 'Camisetas Originales', descripcion: 'Camisetas originales de equipos nacionales e internacionales.' },
      { nombre: 'Camisetas Réplica', descripcion: 'Réplicas de alta calidad de camisetas de fútbol.' },
      { nombre: 'Camisetas Retro', descripcion: 'Camisetas clásicas y retro de fútbol.' },
      { nombre: 'Accesorios', descripcion: 'Accesorios para fanáticos del fútbol.' },
      { nombre: 'Ediciones Especiales', descripcion: 'Camisetas de ediciones limitadas y colaboraciones.' }
    ]);

    // Crear productos de ejemplo
    await Product.bulkCreate([
      { nombre: 'Camiseta Original Real Madrid 2024', descripcion: 'Camiseta oficial del Real Madrid temporada 2024, tecnología transpirable y escudo bordado.', precio: 89.99, tallas: [ { talla: 'S', stock: 10 }, { talla: 'M', stock: 20 }, { talla: 'L', stock: 20 } ], categoryId: categorias[0].id, destacado: true },
      { nombre: 'Camiseta Réplica Barcelona 2024', descripcion: 'Réplica de alta calidad de la camiseta del FC Barcelona 2024.', precio: 39.99, tallas: [ { talla: 'S', stock: 30 }, { talla: 'M', stock: 30 }, { talla: 'L', stock: 20 } ], categoryId: categorias[1].id, destacado: true },
      { nombre: 'Camiseta Retro Argentina 1986', descripcion: 'Camiseta retro de la selección Argentina, mundial 1986.', precio: 59.99, tallas: [ { talla: 'M', stock: 15 }, { talla: 'L', stock: 15 } ], categoryId: categorias[2].id },
      { nombre: 'Pulsera Fan Fútbol', descripcion: 'Pulsera de silicona con escudos de equipos populares.', precio: 5.00, tallas: [ { talla: 'Única', stock: 100 } ], categoryId: categorias[3].id },
      { nombre: 'Camiseta Edición Especial Champions', descripcion: 'Camiseta edición limitada para la final de la Champions League.', precio: 99.99, tallas: [ { talla: 'S', stock: 5 }, { talla: 'M', stock: 10 }, { talla: 'L', stock: 5 } ], categoryId: categorias[4].id, destacado: true },
      { nombre: 'Camiseta Original Manchester United 2024', descripcion: 'Camiseta oficial del Manchester United temporada 2024.', precio: 89.99, tallas: [ { talla: 'S', stock: 10 }, { talla: 'M', stock: 15 }, { talla: 'L', stock: 15 } ], categoryId: categorias[0].id },
      { nombre: 'Camiseta Réplica Juventus 2024', descripcion: 'Réplica de la camiseta de la Juventus 2024.', precio: 39.99, tallas: [ { talla: 'S', stock: 20 }, { talla: 'M', stock: 20 }, { talla: 'L', stock: 20 } ], categoryId: categorias[1].id },
      { nombre: 'Camiseta Retro Brasil 1970', descripcion: 'Camiseta retro de la selección Brasil, mundial 1970.', precio: 59.99, tallas: [ { talla: 'M', stock: 10 }, { talla: 'L', stock: 15 } ], categoryId: categorias[2].id },
      { nombre: 'Bufanda Edición Especial', descripcion: 'Bufanda edición especial conmemorativa.', precio: 19.99, tallas: [ { talla: 'Única', stock: 35 } ], categoryId: categorias[4].id },
    ]);

    // Crear configuraciones por defecto
    await Setting.bulkCreate([
      { clave: 'nombre_empresa', valor: 'Camisetas Fútbol', descripcion: 'Nombre de la empresa' },
      { clave: 'contacto_metodo', valor: 'whatsapp', descripcion: 'Método de contacto principal (whatsapp, telefono, email, instagram)' },
      { clave: 'contacto_whatsapp', valor: '573124775193', descripcion: 'Número de WhatsApp (con código de país)' },
      { clave: 'contacto_telefono', valor: '', descripcion: 'Número de teléfono' },
      { clave: 'contacto_email', valor: '', descripcion: 'Correo electrónico de contacto' },
      { clave: 'contacto_instagram', valor: '', descripcion: 'Usuario de Instagram (sin @)' },
    ]);

    console.log('Datos iniciales creados exitosamente.');
    console.log('Admin: admin@camisetas.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initDatabase();
