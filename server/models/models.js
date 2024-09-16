const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  job_title: { type: DataTypes.STRING, allowNull: false },
  workplace: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const UserSubscription = sequelize.define("user_subscription", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING },
  format_online: { type: DataTypes.BOOLEAN, allowNull: false },
  format_onsite: { type: DataTypes.BOOLEAN, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  topic: { type: DataTypes.STRING, allowNull: false },
  available_seats: { type: DataTypes.INTEGER},
  image: { type: DataTypes.STRING, allowNull: false },
  keywords: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
});

const Host = sequelize.define("host", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  job_title: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const EventInfo = sequelize.define("event_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  requirements: { type: DataTypes.STRING, allowNull: false },
});

const Agenda = sequelize.define("agenda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  subtitle: { type: DataTypes.STRING, allowNull: true },
  is_rest: { type: DataTypes.BOOLEAN, allowNull: false },
  speaker_name: { type: DataTypes.STRING, allowNull: true },
  speaker_job: { type: DataTypes.STRING, allowNull: true },
  speaker_about: { type: DataTypes.STRING, allowNull: true },
});

const EventHost = sequelize.define("event_host", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(UserSubscription);
UserSubscription.belongsTo(User);

Event.hasMany(UserSubscription);
UserSubscription.belongsTo(Event);

Host.belongsToMany(Event, { through: EventHost });
Event.belongsToMany(Host, { through: EventHost });

Event.hasMany(EventInfo, { as: "info" });
EventInfo.belongsTo(Event);

Event.hasMany(Agenda, { as: "agenda" });
Agenda.belongsTo(Event);

module.exports = {
  User,
  Event,
  Host,
  EventInfo,
  EventHost,
  Agenda,
  UserSubscription,
};
