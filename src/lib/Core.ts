import { Format, TransformableInfo } from "logform";
import * as winston from "winston";
import { IBindingOption } from "./bindings/IBindings";
import * as TransportStream from "winston-transport";
import { CloudWatchBindigs } from "./bindings/impl/Cloudwatch_Bindings";
import { Bindings } from "./bindings/Binding";

export class Logger {
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
    private static instance: Logger;

    private readonly myFormat: Format = winston.format.printf((infoMessage: TransformableInfo) => this.buildFormat(infoMessage)
    );

    private binding?: Bindings;

    private readonly consoleTransportStream = new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), this.myFormat)
    });

    private readonly buildFormat = (infoMessage: TransformableInfo) => {
        return `${infoMessage.timestamp} ${infoMessage.level}: ${infoMessage.message} ${this.binding?.verbose.print()} \n`;
    }

    private fetchTransports() {
        /* 
        ** Typescript cant infer types being returned from function because
        ** each call is runtime and dynamic. Therefore, first fetch bindings
        ** and then check for its initialisation than checking the method itself.
        */

        let bindingStream: TransportStream | undefined;
        if (this.binding !== undefined) {
            bindingStream = this.binding.getStream();
        }

        return (process.env.NODE_ENV === "production" && bindingStream !== undefined)
            ? bindingStream
            : this.consoleTransportStream;
    }

    private readonly logger = winston.createLogger({
        level: "silly",
        format: winston.format.combine(winston.format.timestamp(), this.myFormat),
        transports: [],
        exitOnError: true
    });

    private constructor() { }

    public configure(config?: IBindingOption) {
        if (config !== undefined) {
            // Instanceof is not working here.
            // TODO: Check what type of config it is and then act accordingly to build bindings
            this.binding = CloudWatchBindigs.getInstance();
            if (config.format === undefined) {
                config.format = this.buildFormat;
            }
            this.binding.config(config);

        }
        this.logger.transports.splice(0, this.logger.transports.length);
        this.logger.add(this.fetchTransports());
    }

    public setVerbose(isEnabled: boolean) {
        this.binding!.verbose.enabled = isEnabled;
    }

    public isVerbose() {
        return this.binding?.verbose.enabled;
    }

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
