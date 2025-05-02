import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('netflix', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
});
