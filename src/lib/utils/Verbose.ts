export class Verbose {

    public enabled: boolean = false;

    public print() {
        return this.enabled ? this.harshPrint() : "";
    }

    public harshPrint() {
        return `GID: ${this.gid()}, UID: ${this.uid()}, PID: ${this.pid()}, MEMORY: { ${this.memory()} }`;
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





