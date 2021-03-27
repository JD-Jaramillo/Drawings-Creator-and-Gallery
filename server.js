const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> b27b4208cdd326c6b0d9128cf6131601d2c3c162

const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
<<<<<<< HEAD

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

=======
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
>>>>>>> b27b4208cdd326c6b0d9128cf6131601d2c3c162
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening http://localhost:' + PORT));
});