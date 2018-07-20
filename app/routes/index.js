const itemRoutes = require('./items_routes');

module.exports = (app, db) => {
  itemRoutes(app, db);
}
