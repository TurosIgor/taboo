![Logo](taboo/src/assets/TabooLogo.png)
# Taboo

A browser-based party game based on the famous **Taboo**. Passing around the same device, players take turn to describe a chosen Word, without using any of the listed *taboo* words. Supports up to 8 players in 2 teams.

## Usage

The project is built using a MERN stack, with separate directories for the database, backend and frontend. If you want to run it locally, use either of the the following methods:

### Building the app locally:
- Setting up the Database:
1. Create a [MongoDB](https://www.mongodb.com/) session - either in a container or using Atlas.
2. Import the **taboo.json** from the **database** directory.
- Running Backend server:
1. After cloning the repository, navigate to the **server** directory and run the following command:
```bash
npm install
```
2. Set up the **.env** file using the provided **.env_sample** file.
    - `MONGO_URI` is the connection string to your mongo database.
    - `SESSION_SECRET` is a secret string used to validate users' cookies and manage already used words.
3. With dependencies successfully installed, run the server with:
```bash
node server.js
```
By default the server runs on port **3000**, but you can modify it in the **server.js** file if necessary.
- Running Frontend client:
1. After cloning the repository, navigate to the **taboo** directory and run the following command:
```bash
npm install
```
2. Set up the **.env** file using the provided **.env_sample** file.
    - `API_URL` is the backend server's address, in our case `http://localhost:3000`
3. With dependencies successfully installed, run the server with:
```bash
npm run dev
```
Now you can access the game on the default address of: `http://localhost:5173`
___
### Using container orchestration:
Use the latest images in an orchestration tool from the [DockerHub](https://hub.docker.com/repositories/igorturos) repositories, or use Docker to build the images from the local files yourself. If so, provide the following environmental variables:
- Backend:
    - `MONGO_URI="mongodb://<mongo-container-name>:27017/<mongo-database-name>"`
    - `SESSION_SECRET=<secret string>`
- Frontend:
    - `API_URL="http://<backend-container-name>:3000"`
If you build the Docker images yourself, check if the **nginx.conf** file has the correct `proxy_pass` URL - should be the same as **API_URL**.
___
### Hosting on Cloud servers:
In the **infra** directory, you can use the set up [Terraform](https://www.terraform.io/) project to host the application in an **AWS EKS cluster**. 

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@TurosIgor](https://www.github.com/TurosIgor)

## Feedback

If you have any feedback, please reach out to me at valyp99@gmail.com
