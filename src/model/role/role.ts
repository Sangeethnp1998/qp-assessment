import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database/sequelize';

class Role extends Model {}

Role.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
      },
      viewPermission: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: true
      },
      addPermission: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      updatePermission: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      deletePermission: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      },
      {
        sequelize,
        modelName : 'Role',
        tableName :'roles',
        timestamps:false
      }
)

// Define a hook to execute after the User table is created
Role.afterSync((options) => {
  // This function will be executed after the User table is created
  // You can add your logic here to create a new user
  Role.bulkCreate([
    {
    roleName: 'admin', 
    viewPermission : true,
    addPermission : true,
    updatePermission : true,
    deletePermission : true,
    },
    {
    roleName: 'user', 
    viewPermission : true,
    addPermission : false,
    updatePermission : false,
    deletePermission : false,
    }
  ])
  .then((role : any) => {

    role.map((item : any)=>{
      console.log('New role created:', item.dataValues.roleName);
    })
    
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });
});

export default Role;