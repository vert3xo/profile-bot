import { TextChannel } from "discord.js";
import { Body, JsonController, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { IsAuthenticated } from "../middleware/IsAuthenticated";
import { ProfileBot } from "../../ProfileBot";
import type { MessageBody } from "../types/MessageType";
import type { ResponseType } from "../types/ResponseType";

@UseBefore(IsAuthenticated)
@JsonController("/messages")
@Service()
export class MessagesController {
  constructor(private readonly client: ProfileBot) {}

  @Post("/send")
  async postSend(@Body() body: MessageBody): Promise<ResponseType> {
    const guilds = await this.client.client.guilds.fetch();
    if (!guilds.has(body.serverId)) {
      return {
        success: false,
        message: "Unknown server",
      };
    }

    const guild = await guilds.get(body.serverId).fetch();
    const channels = await guild.channels.fetch();

    if (!channels.has(body.channelId)) {
      return {
        success: false,
        message: "Unknown channel",
      };
    }

    const channel = channels.get(body.channelId);

    if (channel.type !== "GUILD_TEXT") {
      return {
        success: false,
        message: "Not a text channel",
      };
    }

    await (channel as TextChannel).send(body.message);

    return {
      success: true,
      message: "Message sent",
    };
  }
}
