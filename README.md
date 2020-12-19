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

## For authentication please follow the steps
- Run following command to create user from terminal
```
curl -X POST \
  http://localhost:3000/auth-users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c2fde45f-9f3f-5cdb-736b-b59e97b80d9d' \
  -d '{
	"username": YOUR_USERNAME,
	"password": YOUR_PASSWORD
}'
```

- To generate a token run following command

```
curl -X POST \
  http://localhost:3000/auth-users/authenticate \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 1fcd7c48-29d5-7bc2-0a6d-f274c0d6f774' \
  -d '{
	"username": YOUR_USERNAME,
	"password": YOUR_PASSWORD
}'
```

- Use the token to pass from the swagger authorize button
