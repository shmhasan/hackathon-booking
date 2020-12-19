import express from 'express';
import bodyParser from 'body-parser';
import { Constants } from './config/Constants';
import { isAuthenticated } from './middlewares';
import {Logger } from "./config/Logger";

const App = express();

/**
 * Register Common Middlewares
 */
App.use(bodyParser.json());

/**
 * Rester Routers
 */
global["logger"] = Logger

export default App