export interface IBindings {
    config(obj: unknown): void;
    mapTransports(obj: unknown): void;
    setVerbose(isVerbose: boolean): void;
}

export interface ICoudWatchBindingOptions {
    accessKeyId: string;
    secretKey: string;
    region: string;
    level: "silly" | "info" | "error" | "debug";
    logStream: string;
    logGroup: string;
}