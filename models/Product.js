import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Category from "./Category.js";

const Product = db.define('products', {
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    brand: { type: DataTypes.STRING},
    name: { type: DataTypes.STRING},
    price: { type: DataTypes.DECIMAL},
    may_price: { type: DataTypes.DECIMAL},
    img: { type: DataTypes.STRING},
    description: { type: DataTypes.TEXT},
    stock: { type: DataTypes.INTEGER}
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

export default Product;