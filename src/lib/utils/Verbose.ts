export class Verbose {
    public static getInstance(): Verbose {
        if (!Verbose.instance) {
            Verbose.instance = new Verbose();
        }
        return Verbose.instance;
    }
    private static instance: Verbose;
    private static verbose: boolean;

    private constructor() { }

    public print() {
        return Verbose.verbose ? this.harshPrint() : "";
    }

    public harshPrint() {
        return `GID: ${this.gid()}, UID: ${this.uid()}, PID: ${this.pid()}, MEMORY: { ${this.memory()} }`;
    }

    public setVerbose(flag: boolean) {
        Verbose.verbose = flag;
    }

    public isVerbose() {
        return Verbose.verbose;
    }

    private gid() {
        return (process.getgid ? process.getgid() : 0);
    }

    private uid() {
        return (process.getuid ? process.getuid() : 0);
    }

    private pid() {
        return process.pid;
    }

    private memory() {
        const memInfo = process.memoryUsage();
        return `ArrayBuffer: ${memInfo.arrayBuffers}, External: ${memInfo.external}, HeapTotal: ${memInfo.heapTotal}, HeapUsed: ${memInfo.heapUsed}, RSS: ${memInfo.rss}`;
    }
}





