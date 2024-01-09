const express = require('express');
const sequelize = require('./config/sequelize-config');
const UserRoute = require('./routes/userRoutes');
const NoteRoute = require('./routes/noteRoutes');
const CategorieRoute = require('./routes/categorieRoutes');
const bodyParser  = require('body-parser');
const path = require("path");
const cors = require("cors");
const app = express();

app.set("PORT", 4000);
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(cors());
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  extended: true,
  limit: "500mb"
}));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.raw({ limit: "500mb" }));

app.use('/api/user', UserRoute);
app.use('/api/note', NoteRoute);
app.use('/api/categorie', CategorieRoute);

app.listen(app.get("PORT"), () => {
  console.log("Server on port", app.get("PORT"));
  sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to the database:', error));
})