import * as fs from "fs";
import * as YAML from "yaml";

export class Util {
  static baseDir(): string {
    return __dirname + "/../../";
  }

  public static async sleep(sec: number): Promise<void> {
    return new Promise(
      (resolve) => {
        setTimeout(resolve, sec * 1000);
      }
    );
  }

  static config(name = "application"): any {
    const configDir = __dirname + "/../../config";
    const yamlString = fs.readFileSync(`${configDir}/${name}.yaml`, "utf8");
    return YAML.parse(yamlString);
  }
}
