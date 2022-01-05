import { ButtonInteraction, Client } from "discord.js";

export abstract class Button {
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract executeInteraction(
    client: Client,
    interaction: ButtonInteraction
  ): Promise<void>;
}
