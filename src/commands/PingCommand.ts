import { Client, CommandInteraction, CacheType } from "discord.js";
import { Command } from "./Command";

export class PingCommand extends Command {
  constructor(name: string) {
    super(name);
  }

  executeInteraction(
    client: Client<boolean>,
    interaction: CommandInteraction<CacheType>
  ): Promise<void> {
    return interaction.reply("Pong!");
  }
}
