const path = require('path');

const express = require('express'); // 얘는 ./이렇게 시작할 필요없지만
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth.routes'); // 얘같은 사용자 지정파일은 ./이렇게 시작해야함
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const checkAuthStatus = require('./middlewares/check-auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(baseRoutes);
app.use(productRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
	.then(function() {
		app.listen(3000);
	})
	.catch(function(error) {
		console.log('Failed to connect to the database!');
		console.log(error);
	});