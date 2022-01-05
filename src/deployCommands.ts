import fetch from "node-fetch";
import config from "./config.json";

enum Mode {
  Set = "set",
  Clear = "clear",
}

type CommandParams = {
  name: string;
  description: string;
  options?: AppCommandOption[];
  default_permission?: boolean;
  type?: AppCommandOptionType;
};

type AppCommandOption = {
  type: AppCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: AppCommandOptionChoice[];
  options?: AppCommandOption[];
  channel_types?: ChannelTypes[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
};

enum AppCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
}

enum ChannelTypes {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
}

type AppCommandOptionChoice = {
  name: string;
  value: string | number;
};
const baseUrl = "https://discord.com/api/v9/applications";

const specifiedArgs = process.argv.slice(2);
const mode = specifiedArgs[0] || "set";
(async () => {
  if (!([Mode.Set, Mode.Clear] as string[]).includes(mode.toLowerCase())) {
    return console.log("The mode can either be 'set' or 'clear'");
  }

  if ((mode as Mode) === Mode.Clear) {
    const response = await fetch(
      `${baseUrl}/${config.applicationId}/commands`,
      {
        method: "put",
        headers: {
          Authorization: `Bot ${config.discordToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      }
    );
    return console.log(await response.json());
  }

  if ((mode as Mode) === Mode.Set) {
    const commands: CommandParams[] = [];
    commands.push({
      name: "profile",
      description: "Gets you a brand new profile picture!",
    });

    const response = await fetch(
      `${baseUrl}/${config.applicationId}/commands`,
      {
        method: "put",
        headers: {
          Authorization: `Bot ${config.discordToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
      }
    );

    return console.log(await response.json());
  }
})();
