import { Model } from 'sequelize';

export class WatchProgress extends Model {

    public id!: number;
    public userId!: number;
    public title!: string;
    public episodeNumber!: number;
    public currentTime!: number;
}
