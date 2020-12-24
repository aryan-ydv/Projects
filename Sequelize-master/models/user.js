const Sequelize = require("sequelize");
const db= require("../db/config


module.exports = db.sequelize.define(
  "test_task", 
  {
    task_name: { type: Sequelize.STRING }
  },
  { freezeTableName: 'test_task' , timestamps: false}
  );

