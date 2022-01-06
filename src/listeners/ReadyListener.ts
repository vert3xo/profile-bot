import { ProfileBot } from "../ProfileBot";
import { Listener } from "./Listener";

export class ReadyListener extends Listener {
  registerListener(profileBot: ProfileBot) {
    profileBot.client.once("ready", async () => {
      console.log("Profile Bot ready!");
    });
    profileBot.client.once("shardReady", async (shardId: number) => {
      console.log(`Shard ID ${shardId} ready!`);
    });
  }
}
