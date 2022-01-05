import { Client, SelectMenuInteraction, CacheType } from "discord.js";
import path from "path";
import { Menu } from "./Menu";

export class ColorSelectMenu extends Menu {
  constructor() {
    super("colorselectmenu");
  }

  executeInteraction(
    client: Client<boolean>,
    interaction: SelectMenuInteraction<CacheType>
  ): Promise<void> {
    const [value] = interaction.values;

    interaction.user.send({
      content: "Here's the image you requested",
      files: [
        path.resolve(path.join(__dirname, "../../images", `${value}.png`)),
      ],
    });

    return interaction.reply({
      ephemeral: true,
      content: "The bot will DM you your image shortly!",
    });
  }
}
