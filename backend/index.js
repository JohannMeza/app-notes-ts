const express = require('express');
const sequelize = require('./config/sequelize-config');
const UserRoute = require('./routes/userRoutes');
const bodyParser  = require('body-parser');
const path = require("path");
const cors = require("cors");
const app = express();

app.set("PORT", 4000);
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', UserRoute)

app.listen(app.get("PORT"), () => {
  console.log("Server on port", app.get("PORT"));
  sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to the database:', error));
})