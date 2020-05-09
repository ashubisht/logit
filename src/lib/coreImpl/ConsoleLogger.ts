import { Logger } from "../Core";
import { Bindings } from "../bindings/Binding";
import * as winston from "winston";
import { ConsoleBinding } from "../bindings/impl/Console_Binding";

export class ConsoleLogger extends Logger {
  protected binding: Bindings;
  protected logger: winston.Logger;

  constructor() {
    super();
    this.binding = ConsoleBinding.getInstance();
    this.logger = winston.createLogger({
      level: "silly",
      // Needs update here
      format: winston.format.combine(
        winston.format.timestamp(),
        this.binding.buildFormat(this.binding.getFormatFunction())
      ),
      transports: [],
      exitOnError: true,
    });
  }
}
