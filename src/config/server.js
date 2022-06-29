const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.pathList = {
            pathAplication :   '/api/aplication',
        }

        this.connectDB();
        this.middlewares()
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.pathList.pathAplication, require('../routes/aplication'));
    }

    listen() {
      this.app.listen(this.port, () => {
          console.log(`Server running on port ${ this.port }`);
      });  
    }
}

module.exports = Server;