require("dotenv").config();
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { IndexController } from "./web/controllers/IndexController";
import { MessagesController } from "./web/controllers/MessagesController";
import { Container } from "typedi";

const port = process.env.PORT || 3000;

useContainer(Container);

const app = createExpressServer({
  controllers: [IndexController, MessagesController],
});
app.listen(port);

console.log(`Express listening on port ${port}`);
