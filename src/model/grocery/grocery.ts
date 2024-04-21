import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/sequelize';

class Grocery extends Model {}

Grocery.init(
    {
        groceryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groceryName: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
        },
        {
            sequelize,
            modelName : 'Grocery',
            tableName : 'groceries',
            timestamps: false
        }
)

export default Grocery;