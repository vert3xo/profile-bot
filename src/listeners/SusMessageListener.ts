import { ProfileBot } from "../ProfileBot";
import { Listener } from "./Listener";

export class SusMessageListener extends Listener {
  registerListener(profileBot: ProfileBot): void {
    profileBot.client.on("messageCreate", async (message) => {
      const senderId = message.author.id;
      if (
        senderId !== "506103884985401354" &&
        senderId !== "432234662543360020"
      ) {
        return;
      }
      await message.react("🇬");
      await message.react("🇦");
      await message.react("🇾");
    });
  }
}
