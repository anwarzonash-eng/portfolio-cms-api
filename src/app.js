import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { controllers } from "./controllers";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware";
import fileUpload from "express-fileupload";

class App {
  app;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(bodyParser.json({ limit: "50mb" }));




    this.app.use(cors({
      origin: '*'
    }));


    // this.app.use(cors({ origin: 'http://localhost:4200' }));





    // this.app.use(cors({
    //   origin: [
    //     'http://localhost:5002',
    //     'http://localhost:4200',
    //     'http://localhost:6001',
    //     'http://localhost:6002',
    //     'http://localhost:6003',
    //     'https://leads.example.com',
    //     'http://leads.example.com',
    //     'https://example.com',
    //     'http://example.com'

    //   ]
    // }));


    this.app.use(express.static("public"));
    this.app.use(express.static("uploads"));


    // this.app.use(express.json());
    this.app.use(fileUpload());

    this.app.get("/index", function (req, res) {
      res.send({ data: 'updated' });
    });

    this.initializeControllers();
    this.initializeMiddlewares();
  }

  initializeControllers() {
    var controllersList = controllers();

    controllers().map((controller) => {
      this.app.use("/", controller.router);
    });
  }

  initializeMiddlewares() {
    this.app.use(errorMiddleware());
  }
}

export default App;
