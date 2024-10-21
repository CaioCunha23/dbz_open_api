import Season from './Season.js';
import Episode from './Episode.js';

Episode.belongsTo(Season, { foreignKey: 'season_id' })
Season.hasMany(Episode, { foreignKey: 'season_id' })