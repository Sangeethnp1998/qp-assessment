import sequelize from "../database/sequelize";
import Role from "./role/role";
import User from "./user/user";
import Grocery from "./grocery/grocery";
import Order from "./order/order";


Role.hasMany(User,{foreignKey : 'roleId'});
User.belongsTo(Role,{foreignKey: 'roleId'})


// Order.hasMany(Grocery,{foreignKey : 'groceryId'});
// Grocery.belongsTo(Order,{foreignKey: 'groceryId'})


async function syncDbModel(){
    try {
        const model = [
            Role,
            User,
            Grocery,
            Order
        ]
        // await Order.sync({force : true});
        console.log('Database tables synchronized successfully.')
    } catch (error) {
        console.log('Error synchronizing database tables:',error)
    }
}
export default syncDbModel;