
import { WatchProgress } from "../class/watch-progress";
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';
import User from './User';

WatchProgress.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        episodeNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentTime: {
            type: DataTypes.FLOAT, 
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'WatchProgress',
    }
);

WatchProgress.belongsTo(User, { foreignKey: 'userId' });

export default WatchProgress;