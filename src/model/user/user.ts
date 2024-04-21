import {Model,DataTypes} from 'sequelize';
import sequelize from '../../database/sequelize';
import Role from '../role/role';
import {hashPassword} from '../../util/util'

class User extends Model {}

User.init(
    {
      // Define model attributes
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model : Role,
            key: 'roleId'
        }
      }
    },
    {
        sequelize,
        modelName : 'User',
        tableName :'users',
        timestamps:false
    }
)

// Define a hook to execute after the User table is created
User.afterSync(async(options) => {
  // This function will be executed after the User table is created
  // You can add your logic here to create a new user
  User.bulkCreate([
    {
      userName: 'admin', 
      password: await hashPassword("admin1234"),
      roleId : 1
    },
    {
      userName: 'user',
      password: await hashPassword("user1234"), 
      roleId : 2
    }
    
  ])
  .then((user : any) => {
    user.map((item : any)=>{
      console.log('New user created:', item.dataValues.userName);
    })
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });

});
export default User;