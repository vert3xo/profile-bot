import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { CommandsController } from "./web/CommandsController";
import { MessagesController } from "./web/MessagesController";

const port = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [CommandsController, MessagesController],
});

app.listen(3000);

console.log(`Express listening on port ${port}`);
