import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";

@Controller("/")
@Service()
export class IndexController {
  @Get("/")
  index() {
    return "The bot has awoken";
  }
}
