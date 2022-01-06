import { Controller, Get } from "routing-controllers";
import { Inject, Service } from "typedi";
import { ProfileBot } from "../../ProfileBot";

@Controller("/messages")
@Service()
export class MessagesController {
  constructor(private readonly client: ProfileBot) {}

  @Get("/send")
  async send() {
    return "Send";
  }
}
