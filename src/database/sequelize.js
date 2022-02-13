const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Book = require('./models/book')(sequelize, Sequelize)
const Demand = require('./models/demand')(sequelize, Sequelize)
const DemandCategory = require('./models/demandcategory')(sequelize, Sequelize)
const Event = require('./models/event')(sequelize, Sequelize)
const Like = require('./models/like')(sequelize, Sequelize)
const Locker = require('./models/locker')(sequelize, Sequelize)
const LostAndFound = require('./models/lostandfound')(sequelize, Sequelize)
const PasswordReset = require('./models/passwordreset')(sequelize, Sequelize)
const Rent = require('./models/rent')(sequelize, Sequelize)
const Role = require('./models/role')(sequelize, Sequelize)
const Transaction = require('./models/transaction')(sequelize, Sequelize)
const User = require('./models/user')(sequelize, Sequelize)


Book.hasMany(Rent, {
  foreignKey: 'rentable_id',
  constraints: false,
  scope: {
    rentable_type: 'book'
  },
  as: 'rents'
})

Demand.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
Demand.hasMany(Like, {
  foreignKey: 'likeable_id',
  constraints: false,
  scope: {
    likeable_type: 'demand'
  },
  as: 'likes'
})
Demand.belongsTo(DemandCategory, { foreignKey: 'category_id', as: 'category' })

DemandCategory.hasMany(Demand, { foreignKey: 'category_id', as: 'demands' })
Event.belongsToMany(User, {
  through: 'event_users',
  foreignKey: 'event_id',
  otherKey: 'user_id',
  as: 'users'
})

Like.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
Like.belongsTo(Demand, { foreignKey: 'likeable_id', constraints: false })

Locker.hasMany(Rent, {
  foreignKey: 'rentable_id',
  constraints: false,
  scope: {
    rentable_type: 'locker'
  },
  as: 'rents'
})

PasswordReset.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

Rent.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
Rent.belongsTo(Locker, { foreignKey: 'rentable_id', constraints: false })
Rent.belongsTo(Book, { foreignKey: 'rentable_id', constraints: false })

User.hasMany(Rent, { foreignKey: 'user_id', as: 'rents' })
User.hasMany(Role, { foreignKey: 'user_id', as: 'roles' })
User.belongsToMany(Event, {
  through: 'event_users',
  foreignKey: 'user_id',
  otherKey: 'event_id',
  as: 'registeredEvents'
})
User.hasMany(PasswordReset, { foreignKey: 'user_id', as: 'passwordResets' })


module.exports = {
  Book,
  Demand,
  Event,
  Like,
  Locker,
  LostAndFound,
  PasswordReset,
  Rent,
  Role,
  Transaction,
  User,
}