// From /packages/api/utils/logger.ts
import { Format, TransformableInfo } from "logform";
import * as winston from "winston";
import { EnvConfig } from "./utils/envConfig";

import * as WinstonCloudWatch from "winston-cloudwatch";

export class Logger {
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
    private static instance: Logger;

    private readonly env = EnvConfig.getInstance();

    private readonly cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
        awsAccessKeyId: this.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: this.env.AWS_SECRET_ACCESS_KEY,
        awsRegion: this.env.AWS_REGION,
        awsOptions: {
            accessKeyId: this.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.env.AWS_SECRET_ACCESS_KEY,
            region: this.env.AWS_REGION
            // apiVersion: "2012-11-05"
        },
        level: "silly",
        logStreamName: this.env.AWS_LOG_STREAM_NAME,
        logGroupName: this.env.AWS_LOG_GROUP_NAME
    };

    private readonly myFormat: Format = winston.format.printf(
        (infoMessage: TransformableInfo) => {
            return `${infoMessage.timestamp} ${infoMessage.level}: ${infoMessage.message} \n`;
        }
    );

    private readonly consoleTransportStream = new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), this.myFormat)
    });

    private readonly logger = winston.createLogger({
        level: "silly",
        format: winston.format.combine(winston.format.timestamp(), this.myFormat),
        transports:
            this.env.NODE_ENV === "production"
                ? [new WinstonCloudWatch(this.cloudwatchConfig)]
                : [this.consoleTransportStream],
        exitOnError: false
    });

    private constructor() { }

    // Wrapper methods to add function name and file name in log messages
    public info(source: string, method: string, ...message: string[]) {
        this.logger.info(
            `From ${source} and function ${method} : Message : ${message}`
        );
    }

    public error(source: string, method: string, ...message: string[]) {
        this.logger.error(
            `Error occurred in ${source} inside method ${method} with message: ${message}`
        );
    }

    public debug(source: string, method: string, ...message: string[]) {
        // Winston will write debug logs only when run in debug mode. Use trace for debugs
        this.logger.debug(
            `From ${source} and function ${method} : Message : ${message}`
        );
    }

    public trace(source: string, method: string, ...message: string[]) {
        this.logger.silly(
            `From ${source} and function ${method} : Message : ${message}`
        );
    }
}

// Temporary disabled typing here as this is enforced by typescript spec
export function log(
    _target: object,
    key: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;
    // tslint:disable-next-line: no-any
    descriptor.value = function (...args: any[]) {
        // tslint:disable-next-line: no-invalid-this
        const result = original.apply(this, args);
        // Log the call, and the result
        const loggerInstance = Logger.getInstance();
        loggerInstance.info("", key, `Parameters: ${JSON.stringify(args)}`);
        // Return the result
        return result;
    };
    return descriptor;
}

export const logger = Logger.getInstance();
