import {
  Client,
  SelectMenuInteraction,
  CacheType,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from "discord.js";
import { Menu } from "./Menu";

export class TemplateMenu extends Menu {
  constructor() {
    super("templateselectmenu");
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

    const menu = new MessageActionRow().addComponents(
      new MessageSelectMenu().setCustomId("colorselectmenu").addOptions([
        {
          label: "Blue",
          value: `${value}_blue`,
        },
        {
          label: "Brown",
          value: `${value}_brown`,
        },
        {
          label: "Green",
          value: `${value}_green`,
        },
        {
          label: "Orange",
          value: `${value}_orange`,
        },
        {
          label: "Pink",
          value: `${value}_pink`,
        },
        {
          label: "Purple",
          value: `${value}_purple`,
        },
        {
          label: "Red",
          value: `${value}_red`,
        },
        {
          label: "Yellow",
          value: `${value}_yellow`,
        },
      ])
    );

    return interaction.reply({
      ephemeral: true,
      embeds: [
        colorSelectionEmbed.setDescription(
          `${interaction.user.username} chose the ${value} variant`
        ),
      ],
      components: [menu],
    });
  }
}
