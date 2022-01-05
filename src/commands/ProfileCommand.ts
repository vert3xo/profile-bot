import {
  Client,
  CommandInteraction,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} from "discord.js";
import { Command } from "./Command";

export class ProfileCommand extends Command {
  executeInteraction(
    client: Client<boolean>,
    interaction: CommandInteraction
  ): Promise<void> {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Profile Picture Selector")
          .setDescription(
            "Answer a few questions to get a new profile picture"
          ),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("templateselect")
            .setPlaceholder("Select a template")
            .addOptions([
              {
                label: "Template 1",
                description: "Photo realistic doggo",
                value: "dog1",
              },
              {
                label: "Template 2",
                description: "Drawn doggo",
                value: "dog2",
              },
            ])
        ),
      ],
    });
    return new Promise(() => {});
  }
}
