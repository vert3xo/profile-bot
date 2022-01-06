import "./web";
import { ProfileBot } from "./ProfileBot";
import { Container } from "typedi";

(async () => {
  const profileBot = Container.get(ProfileBot);
  profileBot.start();
})();
