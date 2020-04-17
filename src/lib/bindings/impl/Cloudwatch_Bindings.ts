import * as WinstonCloudWatch from "winston-cloudwatch";
import { IBinding, ICoudWatchBindingOptions } from "../IBindings";
import { Verbose } from "../../utils/Verbose";
import * as AWS from "aws-sdk";

export class CloudWatchBindigs implements IBinding {

    private readonly verbose: Verbose = Verbose.getInstance();
    public transportStream?: WinstonCloudWatch;

    getStream() {
        return this.transportStream;
    }

    config(binding: ICoudWatchBindingOptions) {
        AWS.config.update({
            region: binding.region
        });
        const cloudWatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
            awsAccessKeyId: binding.accessKeyId,
            awsSecretKey: binding.secretKey,
            awsRegion: binding.region,
            awsOptions: {
                accessKeyId: binding.accessKeyId,
                secretAccessKey: binding.secretKey,
                region: binding.region
            },
            level: binding.level,
            logStreamName: binding.logStream,
            logGroupName: binding.logGroup
        }
        this.transportStream = new WinstonCloudWatch(cloudWatchConfig);
    }
    mapTransports(obj: unknown): void {
        throw new Error(`Method not implemented., ${obj}`);
    }
    setVerbose(verbose: boolean): void {
        this.verbose.setVerbose(verbose);
    }

}

