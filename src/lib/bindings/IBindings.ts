import * as TransportStream from "winston-transport";
import { LogEntry } from "winston";

export interface IBinding {
    config(obj: IBindingOption): void;
    mapTransports(obj: unknown): void;
    getStream(): TransportStream | undefined;
}

export interface ICloudWatchBindingOptions {
    accessKeyId: string;
    secretKey: string;
    region: string;
    level: "silly" | "info" | "error" | "debug";
    logStream: string;
    logGroup: string;
    format?: (logObject: LogEntry) => string;
}

export interface IConsoleBindingOptions {
    format?: (logObject: LogEntry) => string;
}

export type IBindingOption = ICloudWatchBindingOptions | IConsoleBindingOptions; // Extend more binding options here
