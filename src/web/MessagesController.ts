import { Controller, Get } from "routing-controllers";

@Controller("/messages")
export class MessagesController {
  @Get("/send")
  send() {
    return "Send";
  }
}
