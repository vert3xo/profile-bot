import { Service } from "typedi";

@Service()
export class TestClass {
  private readonly prop;
  constructor() {
    console.log("Bruh");
    this.prop = "sup";
  }
  public readonly property = "hello property";
}
