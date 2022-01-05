import { ProfileBot } from "../index";

export abstract class Listener {
  abstract registerListener(profileBot: ProfileBot): void;
}
