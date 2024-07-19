const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  job_title: { type: DataTypes.STRING, allowNull: false },
  workplace: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketEvent = sequelize.define("basket_event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  //должен быть массив из города и адреса
  location: { type: DataTypes.STRING, allowNull: false },
  format_online: { type: DataTypes.BOOLEAN, allowNull: false },
  format_onsite: { type: DataTypes.BOOLEAN, allowNull: false },
  participation_requirements: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  // должен быть массив из нескольких спикеров с привязкой к расписанию
  topic: { type: DataTypes.STRING, allowNull: false },
  available_seats: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  bg_color: {
    type: DataTypes.ENUM("#1D6BF3", "#000000", "#FFFFFF"),
    allowNull: false,
  },
  text_color: { type: DataTypes.ENUM("#000000", "#FFFFFF"), allowNull: false },
});

const Organizer = sequelize.define("organizer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  job_title: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

// const EventOrganizer = sequelize.define("organizer_event", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   role: { type: DataTypes.ENUM("speaker", "expert", "host"), allowNull: false },
// });

const EventTimeSlot = sequelize.define("event_time_slot", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time: { type: DataTypes.STRING, allowNull: false },
  subtitle: { type: DataTypes.STRING, allowNull: false },
  is_rest: { type: DataTypes.BOOLEAN, allowNull: false },
});

const EventOrganizer = sequelize.define("event_organizer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

//
Basket.hasOne(User);
User.belongsTo(Basket);
//

Basket.hasMany(BasketEvent);
BasketEvent.belongsTo(Basket);

Event.hasMany(BasketEvent);
BasketEvent.belongsTo(Event);

Event.hasMany(EventTimeSlot);
EventTimeSlot.belongsTo(Event);

Event.belongsToMany(Organizer, { through: EventOrganizer });
Organizer.belongsToMany(Event, { through: EventOrganizer });

// Organizer.hasMany(EventOrganizer);
// EventOrganizer.belongsTo(Organizer);

// Event.belongsToMany(EventOrganizer, { through: EventEventOrganizer });
// EventOrganizer.belongsToMany(Event, { through: EventEventOrganizer });

module.exports = {
  User,
  Basket,
  BasketEvent,
  Event,
  Organizer,
  EventTimeSlot,
};
