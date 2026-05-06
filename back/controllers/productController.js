const { Op } = require('sequelize');
const { Product, Category } = require('../models');
const { uploadToSupabase } = require('../config/supabaseStorage');

const productController = {
  // GET /api/products
  async listar(req, res) {
    try {
      const { page = 1, limit = 12, search, categoryId, destacado } = req.query;
      const offset = (page - 1) * limit;
      const where = { activo: true };

      if (search) {
        where[Op.or] = [
          { nombre: { [Op.iLike]: `%${search}%` } },
          { descripcion: { [Op.iLike]: `%${search}%` } }
        ];
      }

      if (categoryId) where.categoryId = categoryId;
      if (destacado === 'true') where.destacado = true;

      const { count, rows } = await Product.findAndCountAll({
        where,
        include: [{ model: Category, as: 'categoria', attributes: ['id', 'nombre'] }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: {
          products: rows,
          total: count,
          page: parseInt(page),
          totalPages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Error al listar productos:', error);
      res.status(500).json({ success: false, message: 'Error al obtener productos.' });
    }
  },

  // GET /api/products/:id
  async obtener(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category, as: 'categoria' }]
      });

      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener producto.' });
    }
  },

  // POST /api/products (admin)
  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, categoryId, destacado } = req.body;
      let { tallas } = req.body;
      let imagenes = [];

      // Normalizar tallas: debe ser array de objetos { talla, stock }
      if (typeof tallas === 'string') {
        try {
          tallas = JSON.parse(tallas);
        } catch {
          tallas = [];
        }
      }
      if (!Array.isArray(tallas)) tallas = [];
      tallas = tallas.filter(t => t && typeof t.talla === 'string' && typeof t.stock === 'number');


      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files.slice(0, 3)) {
          try {
            const url = await uploadToSupabase(file, 'products');
            if (url) imagenes.push(url);
          } catch (imgErr) {
            console.warn('Advertencia: No se pudo subir una imagen:', imgErr.message || imgErr);
          }
        }
      }


      const product = await Product.create({
        nombre, descripcion, precio, tallas, categoryId, destacado, imagenes
      });

      res.status(201).json({ success: true, message: 'Producto creado.', data: product });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ success: false, message: 'Error al crear producto.' });
    }
  },

  // PUT /api/products/:id (admin)
  async actualizar(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
      }

      const { nombre, descripcion, precio, categoryId, destacado, activo } = req.body;
      let { tallas } = req.body;

      // Normalizar tallas: debe ser array de objetos { talla, stock }
      if (typeof tallas === 'string') {
        try {
          tallas = JSON.parse(tallas);
        } catch {
          tallas = [];
        }
      }
      if (!Array.isArray(tallas)) tallas = [];
      tallas = tallas.filter(t => t && typeof t.talla === 'string' && typeof t.stock === 'number');


      const updateData = { nombre, descripcion, precio, tallas, categoryId, destacado, activo };

      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        let nuevasImagenes = [];
        for (const file of req.files.slice(0, 3)) {
          try {
            const url = await uploadToSupabase(file, 'products');
            if (url) nuevasImagenes.push(url);
          } catch (imgErr) {
            console.warn('Advertencia: No se pudo subir una imagen:', imgErr.message || imgErr);
          }
        }
        updateData.imagenes = nuevasImagenes;
      }

      await product.update(updateData);
      res.json({ success: true, message: 'Producto actualizado.', data: product });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ success: false, message: error.message || 'Error al actualizar producto.', error });
    }
  },

  // DELETE /api/products/:id (admin)
  async eliminar(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
      }

      await product.update({ activo: false });
      res.json({ success: true, message: 'Producto eliminado.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar producto.' });
    }
  },

  // DELETE /api/products/:id/permanent (admin)
  async eliminarPermanentemente(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
      }
      await product.destroy();
      res.json({ success: true, message: 'Producto eliminado permanentemente.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar permanentemente el producto.' });
    }
  },

  // GET /api/products/admin/all (admin - incluye inactivos)
  async listarAdmin(req, res) {
    try {
      const { page = 1, limit = 20, search } = req.query;
      const offset = (page - 1) * limit;
      const where = {};

      if (search) {
        where[Op.or] = [
          { nombre: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Product.findAndCountAll({
        where,
        include: [{ model: Category, as: 'categoria', attributes: ['id', 'nombre'] }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: { products: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener productos.' });
    }
  }
};

module.exports = productController;
