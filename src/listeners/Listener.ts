import { ProfileBot } from "../ProfileBot";

export abstract class Listener {
  abstract registerListener(profileBot: ProfileBot): void;
}
