import app from './Server';

import http from 'http';
import { Constants } from './config/Constants';
import { createConnection } from 'typeorm';

const SERVER = http.createServer(app);
import path from 'path';

const SQLITE_DATABSE = path.join(__dirname, "../inventory.sqlite");

/**
 * Create dabase connection and initialize the Application
 */
createConnection({
    type: 'sqlite',
    database: SQLITE_DATABSE,
    entities: [
        "./**/entities/*.js"
    ],
    synchronize: true,
    logging: true
}).then((connection)=> {
    connection.synchronize();
    if(connection.isConnected) {
        
        SERVER.listen(Constants.PORT, ()=> {
            console.log(`Application Running at port ${Constants.PORT}`)
        });
    }
})
.catch((e) => {throw new Error(e.message)})


