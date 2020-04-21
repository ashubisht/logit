export type LogLevel = "info" | "error" | "debug" | "trace";

export interface ILogMapper {
  info: LogLevel[];
  error: LogLevel[];
  debug: LogLevel[];
  trace: LogLevel[];
}
