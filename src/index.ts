import "./web";
import config from "./config.json";
import { Client, Intents } from "discord.js";
import { Listener } from "./listeners/Listener";
import { Command } from "./commands/Command";
import { ProfileCommand } from "./commands/ProfileCommand";
import { Button } from "./buttons/Button";
import { ColorButton } from "./buttons/ColorButton";
import { Menu } from "./menus/Menu";
import { TemplateMenu } from "./menus/TemplateMenu";
import { ReadyListener } from "./listeners/ReadyListener";
import { InteractionCreateListener } from "./listeners/InteractionCreateListener";

export class ProfileBot {
  public readonly client: Client;
  public readonly commands: Map<string, Command>;
  public readonly buttons: Map<string, Button>;
  public readonly menus: Map<string, Menu>;

  constructor() {
    this.client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
      ],
      shards: "auto",
      presence: {
        status: "online",
        activities: [
          {
            type: "PLAYING",
            name: "Photoshop",
          },
        ],
      },
    });

    this.commands = new Map<string, Command>();
    this.buttons = new Map<string, Button>();
    this.menus = new Map<string, Menu>();

    this.registerListener(new ReadyListener());
    this.registerListener(new InteractionCreateListener());

    // Buttons for each profile picture template
    this.registerButton(new ColorButton("dog1_green"));
    this.registerButton(new ColorButton("dog1_red"));
    this.registerButton(new ColorButton("dog1_yellow"));
    this.registerButton(new ColorButton("dog1_blue"));
    this.registerButton(new ColorButton("dog2_green"));
    this.registerButton(new ColorButton("dog2_red"));
    this.registerButton(new ColorButton("dog2_yellow"));
    this.registerButton(new ColorButton("dog2_blue"));

    this.registerCommand(new ProfileCommand("profile"));

    this.registerMenu(new TemplateMenu("templateselect"));
  }

  async start(): Promise<void> {
    await this.client.login(config.discordToken);
  }

  registerListener(listener: Listener) {
    listener.registerListener(this);
  }

  registerCommand(command: Command) {
    this.commands.set(command.name, command);
  }

  registerButton(button: Button) {
    this.buttons.set(button.id, button);
  }

  registerMenu(menu: Menu) {
    this.menus.set(menu.value, menu);
  }
}

(async () => {
  const profileBot = new ProfileBot();
  try {
    profileBot.start();
  } catch (e) {
    console.error(e);
  }
})();
