import * as winston from "winston";
import { Bindings } from "../Binding";
import { Verbose } from "../../utils/Verbose";
import { IFileBindingOptions } from "../IBindings";

export class FileBindings extends Bindings {
  public static getInstance(): FileBindings {
    if (!FileBindings.instance) {
      FileBindings.instance = new FileBindings();
    }
    return FileBindings.instance;
  }

  private static instance: FileBindings;

  public verbose: Verbose = new Verbose();
  public transportStream?: winston.transports.FileTransportInstance;

  private buildTransport(
    level: string,
    project: string,
    maxFiles: number,
    maxSizeBytes: number,
    tailable: boolean,
    zippedArchive: boolean
  ) {
    return {
      filename: `/var/log/app_log/${project}-${process.env.ENV}-${level}.log`,
      maxFiles,
      maxsize: maxSizeBytes,
      tailable,
      zippedArchive,
    };
  }

  public config(binding: IFileBindingOptions): void {
    const format = binding.format;
    if (format !== undefined) {
      this.getFormatFunction = () => format;
    }
    const baseLevel = binding.level === "trace" ? "silly" : binding.level;
    this.transportStream = new winston.transports.File(
      this.buildTransport(
        baseLevel,
        binding.project,
        binding.maxFiles,
        binding.maxSizeBytes,
        binding.tailable,
        binding.zippedArchive
      )
    );
  }

  public getStream() {
    return this.transportStream;
  }
}
