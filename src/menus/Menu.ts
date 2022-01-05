import { Client, SelectMenuInteraction } from "discord.js";

export abstract class Menu {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  abstract executeInteraction(
    client: Client,
    interaction: SelectMenuInteraction
  ): Promise<void>;
}
