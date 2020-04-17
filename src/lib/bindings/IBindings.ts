import * as TransportStream from "winston-transport";

export interface IBinding {
    config(obj: IBindingOption): void;
    mapTransports(obj: unknown): void;
    setVerbose(isVerbose: boolean): void;
    getStream(): TransportStream | undefined;
}

export interface ICloudWatchBindingOptions {
    accessKeyId: string;
    secretKey: string;
    region: string;
    level: "silly" | "info" | "error" | "debug";
    logStream: string;
    logGroup: string;
}

export type IBindingOption = ICloudWatchBindingOptions; // Extend more binding options here
