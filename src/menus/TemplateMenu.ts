import {
  Client,
  SelectMenuInteraction,
  CacheType,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from "discord.js";
import { Menu } from "./Menu";

export class TemplateMenu extends Menu {
  constructor(id: string) {
    super(id);
  }
  executeInteraction(
    client: Client<boolean>,
    interaction: SelectMenuInteraction<CacheType>
  ): Promise<void> {
    const [value] = interaction.values;
    const colorSelectionEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Select a color.")
      .setAuthor({ name: interaction.user.username });
    const buttons = [
      new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`${value}_green`)
            .setStyle("PRIMARY")
            .setLabel("Green")
        )
        .addComponents(
          new MessageButton()
            .setCustomId(`${value}_red`)
            .setStyle("PRIMARY")
            .setLabel("Red")
        )
        .addComponents(
          new MessageButton()
            .setCustomId(`${value}_yellow`)
            .setStyle("PRIMARY")
            .setLabel("Yellow")
        )
        .addComponents(
          new MessageButton()
            .setCustomId(`${value}_blue`)
            .setStyle("PRIMARY")
            .setLabel("Blue")
        ),
    ];

    switch (value) {
      case "dog1":
        return interaction.reply({
          embeds: [
            colorSelectionEmbed.setDescription("You chose the photo variant"),
          ],
          components: buttons,
        });
      case "dog2":
        return interaction.reply({
          embeds: [
            colorSelectionEmbed.setDescription("You chose the drawn variant"),
          ],
          components: buttons,
        });
      default:
        return interaction.reply(
          `${interaction.user.username} selected an invalid value`
        );
    }
  }
}
