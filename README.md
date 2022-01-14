# Book Library 📚

**Second project with [Manchester Codes](https://www.manchestercodes.com/) BACKEND module**

The purpose of this project was to deepend learned knowledge and build an API app with sequelize to manage a book library using CRUD operations.

**Set up**

To be able to run this application following environment needs to be installed:

-clone this repo and set up local .env settings for:

DB_PASSWORD=password

DB_NAME=book_library_api

DB_USER=root

DB_HOST=localhost

DB_PORT=3307

PORT=3000

-change password to something more secure

-set up the database connection, pull docker image and use MySQLWorkbench to manage the database.

```
docker run -d -p 3308:3306 --name book_library_api -e MYSQL_ROOT_PASSWORD=password mysql
```

run:

```
npm i
```

**Reader Routes**

- Create: POST to /reader
  (add: name, email and password)
- Read all: GET to /reader
- Read single reader: GET to /reader/:id
- Update: PATCH to /reader/id
- Delete: DELETE to /reader/:id

Reader controller sends an error message if body parameters are missing, incorrect format or if password is shorter than 8 characters. It doesn't return password back to the client.

**Book Routes**

- Create: POST to /reader
  (add: title and genre)
- Read all: GET to /book
- Read single reader: GET to /book/:id
- Update: PATCH to /book/id
- Delete: DELETE to /book/:id

Book router sends an error message if title or author is missing.

**Project status**

Possible ways to continue this project:

- refactor the code with helper function
- add genre and ISBN and functionality to search by these fields and adding associations.
