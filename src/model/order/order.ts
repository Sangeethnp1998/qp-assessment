import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/sequelize';
import Grocery from '../grocery/grocery';

class Order extends Model {}

Order.init(
    {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderItems:{
            type: DataTypes.BLOB,
            allowNull:false
        }
        },
        {
            sequelize,
            modelName : 'Order',
            tableName : 'orders',
            timestamps: false
        }
)

export default Order;