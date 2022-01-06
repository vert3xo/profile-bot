import { Controller, Get } from "routing-controllers";

@Controller("/")
export class IndexController {
  @Get("/")
  index() {
    return "The bot has awoken";
  }
}
