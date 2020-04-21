import * as winston from "winston";
import { IBindingOption } from "./bindings/IBindings";
import { Bindings } from "./bindings/Binding";
import { ConsoleBinding } from "./bindings/impl/Console_Binding";
import { CloudWatchBindigs } from "./bindings/impl/Cloudwatch_Bindings";

export class Logger {

    private readonly binding: Bindings;
    private readonly logger: winston.Logger;

    public constructor(bindTo: "aws" | "gcp" | "console" | "papertrail") {
        switch (bindTo) {
            case "aws":
                this.binding = CloudWatchBindigs.getInstance();
                break;
            case "console":
                this.binding = ConsoleBinding.getInstance();
                break;
            // Add more bindings as needed
            default:
                this.binding = ConsoleBinding.getInstance();
        }
        this.logger = winston.createLogger({
            level: "silly",
            // Needs update here
            format: winston.format.combine(winston.format.timestamp(), this.binding.buildFormat(this.binding.getFormatFunction())),
            transports: [],
            exitOnError: true
        });
    }

    public configure(config: IBindingOption) {
        // Updates the binding
        this.binding.config(config);
        this.logger.transports.splice(0, this.logger.transports.length);
        this.logger.add(this.binding.getStream()!); // Check for removal of !
    }

    public setVerbose(isEnabled: boolean) {
        this.binding.verbose.enabled = isEnabled;
    }

    public isVerbose() {
        return this.binding.verbose.enabled;
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

/*
Temp commented out to prevent additional dev overhead

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

*/
