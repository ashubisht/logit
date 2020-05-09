import { Logger as Core } from "./../Core";
import { Bindings } from "../bindings/Binding";
import * as winston from "winston";
import { FileBindings } from "../bindings/impl/File_Bindings";

export class FileLogger extends Core {
  protected binding: Bindings;
  protected logger: winston.Logger;

  constructor() {
    super();
    this.binding = FileBindings.getInstance();
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
