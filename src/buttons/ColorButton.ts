import { Client, ButtonInteraction, CacheType } from "discord.js";
import { Button } from "./Button";

export class ColorButton extends Button {
  constructor(id: string) {
    super(id);
  }

  executeInteraction(
    client: Client<boolean>,
    interaction: ButtonInteraction<CacheType>
  ): Promise<void> {
    const template = interaction.customId.split("_")[0];
    const color = interaction.customId.split("_")[1];
    return interaction.reply(
      `${interaction.user.username} chose the template ${template} with color ${color}`
    );
  }
}
