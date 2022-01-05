import { Client, CommandInteraction } from "discord.js";

export abstract class Command {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract executeInteraction(
    client: Client,
    interaction: CommandInteraction
  ): Promise<void>;
}
