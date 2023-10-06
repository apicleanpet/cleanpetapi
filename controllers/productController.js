import Category from '../models/Category.js';
import Product from '../models/Product.js';
import {Op} from 'sequelize'

//Show all products
export const productList = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [
                ['brand', 'ASC'],
                ['name', 'ASC']
            ],
            include: {
                model: Category,
                as: 'category'
            }
        });
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
}
//Show product detail
export const productDetail = async (req, res) => {
    try {
        const detail = await Product.findAll({
            where: { id: req.params.id}
        })
        res.json(detail[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Create product
export const productCreate = async (req, res) => {
    try {
        const { category_id, brand, name, price, description, stock } = req.body;
        const img = req.file ? req.file.filename : 'default/product-default.jpg';
        console.log(img)

        await Product.create({ category_id, brand, name, price, img, description, stock });
        res.json({
            'message': 'Registro creado exitosamente'
        })

    } catch (error) {
        res.json( {message: error.message} )
    }
}
// Update product
export const productUpdate = async (req, res) => {
    try {
        await Product.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            'message': 'Registro actualizado exitosamente'
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Delete product
export const productDelete = async (req, res) => {
    try {
        Product.destroy({
            where: {id: req.params.id}
        })
        res.json({
            'message': 'Registro eliminado exitosamente'
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// Product Search
export const searchProducts = async (req, res) => {
    try {
      // Obtiene el término de búsqueda de la consulta de la URL
      const searchTerm = req.query.searchTerm;
  
      // Define un objeto de opciones de consulta
      const queryOptions = {
        order: [
          ['brand', 'ASC'],
          ['name', 'ASC']
        ],
        include: {
          model: Category,
          as: 'category'
        }
      };
  
      // Agrega condiciones de búsqueda según el término de búsqueda
      queryOptions.where = {
        [Op.or]: [
          {
            brand: {
              [Op.like]: `%${searchTerm}%` 
            }
          },
          {
            '$category.name$': {
              [Op.like]: `%${searchTerm}%` 
            }
          },
          {
            name: {
              [Op.like]: `%${searchTerm}%` 
            }
          }
        ]
      };
  
      // Ejecuta la consulta de búsqueda
      const products = await Product.findAll(queryOptions);
  
      // Devuelve los resultados de la búsqueda
      res.json(products);
    } catch (error) {
      res.json({ message: error.message });
    }
  }