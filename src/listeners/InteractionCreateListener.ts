import { ProfileBot } from "..";
import { Button } from "../buttons/Button";
import { Command } from "../commands/Command";
import { Menu } from "../menus/Menu";
import { Listener } from "./Listener";

export class InteractionCreateListener extends Listener {
  registerListener(profileBot: ProfileBot): void {
    profileBot.client.on("interactionCreate", async (interaction) => {
      try {
        if (interaction.isCommand()) {
          const { commandName } = interaction;

          if (!profileBot.commands.has(commandName)) {
            return interaction.reply(
              "The command requested was not understood!"
            );
          }

          return await (
            profileBot.commands.get(commandName) as Command
          ).executeInteraction(profileBot.client, interaction);
        } else if (interaction.isButton()) {
          const { customId } = interaction;

          if (!profileBot.buttons.has(customId)) {
            return interaction.reply("This button is invalid!");
          }

          return await (
            profileBot.buttons.get(customId) as Button
          ).executeInteraction(profileBot.client, interaction);
        } else if (interaction.isSelectMenu()) {
          const { customId } = interaction;

          if (!profileBot.menus.has(customId)) {
            return interaction.reply("This menu is invalid!");
          }

          return await (
            profileBot.menus.get(customId) as Menu
          ).executeInteraction(profileBot.client, interaction);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
