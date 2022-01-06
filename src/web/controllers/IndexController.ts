import { Controller, Get } from "routing-controllers";

@Controller("/commands")
export class IndexController {
  @Get("/")
  index() {
    return "The bot has awoken";
  }
}
