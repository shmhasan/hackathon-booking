# Hotel Booking Management

## Technology stacks
 
 - Node JS
 - Express Framework
 - Typescript
 - TypeORM
 - OpenAPI Swagger
 - SQLite as database backend



## Running the application
 - Run the following command to install the dependencies
 ```npm install```
 - Run ```npm run build```
 - RUN ```npm run start```

 OR you after installing the dependencies you can run the application using docker
 - install docker 
 - install docker-compose
 - Run 
 ```
 docker-compose build
 docker-compose up -d
 ```
 - The application should run at the port 3000 by default. You can change the PORT by changing the port section at docker compose

 ## Accessing the UI

 You can access the ui by typing the following address
 ```
 http://localhost:3000/docs

 ```

 - Notes

 Application logging location is set to 
 ```
 /tmp/application.log
 /tmp/application_error.log
 ```

