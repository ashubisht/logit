import { Verbose } from "../../utils/Verbose";
import { Bindings } from "../Binding";
import { IConsoleBindingOptions } from "../IBindings";
import * as winston from "winston";

export class ConsoleBinding extends Bindings {
  public static getInstance(): ConsoleBinding {
    if (!ConsoleBinding.instance) {
      ConsoleBinding.instance = new ConsoleBinding();
    }
    return ConsoleBinding.instance;
  }

  private static instance: ConsoleBinding;

  private constructor() {
    super();
  }

  public readonly verbose: Verbose = new Verbose();
  public transportStream?: winston.transports.ConsoleTransportInstance;

  public config(binding: IConsoleBindingOptions) {
    this.transportStream = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        binding.format !== undefined
          ? this.buildFormat(binding.format)
          : this.buildFormat(this.getFormatFunction())
      ),
    });
  }

  public getStream() {
    return this.transportStream;
  }
}
