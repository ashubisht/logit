import { IBinding, IBindingOption } from "./IBindings";
import * as TransportStream from "winston-transport";
import { Verbose } from "../utils/Verbose";
import { TransformableInfo } from "logform";
import * as winston from "winston";

export abstract class Bindings implements IBinding {
  // Check of both property can be private as none can be instantiated but created internally
  public abstract verbose: Verbose = new Verbose();
  public abstract transportStream?: TransportStream;

  private readonly BUILD_FORMAT = (infoMessage: TransformableInfo) => {
    return `${infoMessage.timestamp} ${infoMessage.level}: ${
      infoMessage.message
    } ${this.verbose.print()} \n`;
  };

  public abstract config(obj: IBindingOption): void;
  public abstract getStream(): TransportStream | undefined;

  // Default format if nothing is provided in parameters during config
  public readonly buildFormat = (
    formatFunction: (infoMessage: TransformableInfo) => string
  ) => {
    return winston.format.printf(formatFunction);
  };

  public getFormatFunction() {
    // Returns a function
    return this.BUILD_FORMAT;
  }
}
