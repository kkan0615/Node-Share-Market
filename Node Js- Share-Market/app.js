const express = require('express');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const path = require('path');
const session = require('express-session'); // npm i express-session [ https://www.npmjs.com/package/express-session ]
const { sequelize } = require('./models');
//const helmet = require('helmet');
//const hpp = require('hpp');
//const RedisStore = require('connect-redis')(session); // npm i redis-connect
require('dotenv').config();

/* Router list */
const authRouter = require('./routes/auth');

const app = express();
sequelize.sync();

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    /*
    **** Open this when you want to use redis ****
    store:new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass:process.env.REDIS_PASSWORD,
    }),
    */
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8001);

/* "start": "cross-env NODE_ENV=production PORT=80 pm2 start app.js -i 0", */
if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    sessionMiddleware.proxy = true;
} else {
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use('/auth', authRouter);

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'is wating you!');
});

