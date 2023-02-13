## Requirement to start the project
 run npm init -y to install package.json file 

 ## Then run npm install to the following packages

 -mongoose -> npm install mongoose
 -express server --> npm install express
 -dotenv --> npm install dotenv
 ## Security packages to protect your api includes:

 -helmet --> npm install helmet
 -cors packages --> npm install cors
 -xss package --> npm install xss

 ## Password hashing, producing json web tokens,status codes dgeneration and image storage

 -bcryptjs package --> npm install bcryptjs NOTE: bcryptjs not bcrypt
 -express-async-errors -->npm install express-async-errors
 -http-status-codes -->npm install http-status-codes
 -cloudinary --> npm install cloudinary
 ## For security purpose the payload to sign the jwt should be a long and unguessable string as the one provided in the environment file(.env)
 ## The .env file is not included in the .gitignore file on purpose,IT IS NOT A BEST PRACTICE

 ##  devDependencies needed for development and tests
 -nodemon -->npm install nodemon --dev-save
 -supertest --> npm install supertest
 -jest --> npm install jest

 ## Trade offs made in the development of the REST API
 -Under the time constraint given, the project can be accurately tested using already available tools such as RapidAPI Client to interact with the api endpoints and possible deploying the api in the rapidapi hub free of charge.
 - A text file with possible application tests is provide in the repo with name app.test.txt that demonstrates how the test can be structured.

 -The endpoints can also be accurately tested on Postman 
 -Assuming the api is running in a localhost the endpoints tested are as follows:
 -->User authentication and registration returns jwt after registration
 
    --http://localhost:3000/api/auth/register -author registration
    --http://localhost:3000/api/auth/login    -author login

 --> Books CRUD Functionality
    --http://localhost:3000/api/books         -Get Books unauthenticated
    --http://localhost:3000/api/books          -Create Book,Get All Books
    --http://localhost:3000/api/books/:id      -Get,Delete,Update 


## Under the assumption that docker is installed in the users machine
- in the terminal of vscode run-> docker compose up to start the project
- run docker compose down to stop the terminal 
