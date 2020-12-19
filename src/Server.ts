import express from 'express';
import bodyParser from 'body-parser';
import { Constants } from './config/Constants';
import { isAuthenticated } from './middlewares';
import {Logger } from "./config/Logger";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load(__dirname + "/../swagger.yaml");

const App = express();

/**
 * Register Common Middlewares
 */
App.use(bodyParser.json());

/**
 * Rester Routers
 */
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

global["logger"] = Logger

export default App