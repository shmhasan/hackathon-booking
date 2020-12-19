import express from 'express';
import bodyParser from 'body-parser';
import { Constants } from './config/Constants';
import { isAuthenticated } from './middlewares';
import {Logger } from "./config/Logger";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { AuthRouter } from './auth/router';
import { RoomRouter } from './rooms/router';
import { CustomerRouter } from './customers/router';
import { BookingRouter } from './bookings/router';

const swaggerDocument = YAML.load(__dirname + "/../swagger.yaml");

const App = express();

/**
 * Register Common Middlewares
 */
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
/**
 * Rester Routers
 */
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

App.use("/auth-users", AuthRouter);
App.use("/rooms", RoomRouter);
App.use("/customers", CustomerRouter);
App.use("/bookings", BookingRouter);

global["logger"] = Logger

export default App