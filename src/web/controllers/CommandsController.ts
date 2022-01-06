import { Controller, Get } from "routing-controllers";

@Controller("/commands")
export class CommandsController {
  @Get("/")
  index() {
    return "Hello World";
  }
}
