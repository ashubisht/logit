import { config } from "dotenv";

export class EnvConfig {
  public static getInstance(): EnvConfig {
    config();
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
      this.instance.assertKeys(Object.keys(this.instance), this.instance);
    }
    return EnvConfig.instance;
  }
  private static instance: EnvConfig;

  public AWS_REGION: string = "";
  public AWS_ACCESS_KEY_ID: string = "";
  public AWS_SECRET_ACCESS_KEY: string = "";
  public AWS_LOG_STREAM_NAME: string = "";
  public AWS_LOG_GROUP_NAME: string = "";
  public NODE_ENV: string = "development";

  private readonly optionalParams: Array<{ prop: string; default: string }> = [
    { prop: "THREAD_MAX", default: "1" }
  ];

  private constructor() { }

  private assertKeys(args: string[], obj: EnvConfig) {
    args.forEach(arg => {
      if (
        arg !== "optionalParams" &&
        (process.env[arg] === undefined || process.env[arg] === "")
      ) {
        if (this.isOptional(arg)) {
          obj[arg as keyof EnvConfig] = this.findArgs(arg)!.default;
        } else {
          throw Error(`Environment variable missing: ${arg}`);
        }
      } else {
        obj[arg as keyof EnvConfig] = process.env[arg]!;
      }
    });
  }

  private findArgs(arg: string) {
    return this.optionalParams.find(obj => obj.prop === arg);
  }

  private isOptional(arg: string): boolean {
    return this.findArgs(arg) !== undefined;
  }
}
