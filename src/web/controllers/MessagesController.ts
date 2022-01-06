import { TextChannel } from "discord.js";
import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { ProfileBot } from "../../ProfileBot";

type ResponseType = {
  success: boolean;
  message?: string;
};

type MessageBody = {
  serverId: string;
  channelId: string;
  message: string;
};

@JsonController("/messages")
@Service()
export class MessagesController {
  constructor(private readonly client: ProfileBot) {}

  @Get("/send")
  async getSend(
    @QueryParam("server_id") serverId: string,
    @QueryParam("channel_id") channelId: string,
    @QueryParam("message") message: string
  ) {
    const guilds = await this.client.client.guilds.fetch();
    if (!guilds.has(serverId)) {
      return "Server not found";
    }

    const guild = await guilds.get(serverId).fetch();
    const channels = await guild.channels.fetch();

    if (!channels.has(channelId)) {
      return "Channel not found";
    }

    const channel = guild.channels.cache.get(channelId);

    if (channel.type !== "GUILD_TEXT") {
      return "Not a text channel";
    }

    await (channel as TextChannel).send(message);

    return "Sent";
  }

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
