import { User } from "../class/user";
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';
import bcrypt from 'bcryptjs'; 


// Définir le modèle User
User.init(
    {
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);
  

User.beforeCreate(async (user: User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

export default User;
