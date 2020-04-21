import * as WinstonCloudWatch from "winston-cloudwatch";
import { Verbose } from "../../utils/Verbose";
import { Bindings } from "../Binding";
import { ICloudWatchBindingOptions } from "../IBindings";

export class CloudWatchBindigs extends Bindings {
  public static getInstance(): CloudWatchBindigs {
    if (!CloudWatchBindigs.instance) {
      CloudWatchBindigs.instance = new CloudWatchBindigs();
    }
    return CloudWatchBindigs.instance;
  }

  private static instance: CloudWatchBindigs;

  private constructor() {
    super();
  }

  public readonly verbose: Verbose = new Verbose();
  public transportStream?: WinstonCloudWatch;

  public config(binding: ICloudWatchBindingOptions) {
    const cloudWatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
      awsAccessKeyId: binding.accessKeyId,
      awsSecretKey: binding.secretKey,
      awsRegion: binding.region,
      awsOptions: {
        accessKeyId: binding.accessKeyId,
        secretAccessKey: binding.secretKey,
        region: binding.region,
      },
      level: binding.level,
      logStreamName: binding.logStream,
      logGroupName: binding.logGroup,
      messageFormatter:
        binding.format === undefined
          ? this.getFormatFunction()
          : binding.format,
    };
    this.transportStream = new WinstonCloudWatch(cloudWatchConfig);
  }

  public getStream() {
    return this.transportStream;
  }
}
