# ultralog

Simple opinionated logging module for NodeJs.

## Overview

Ultralog is opinionated logger framework for any application. This is a wrapper module over the already established libraries to implement logger in simple 3-step code. The idea is to use minimum configuration and achieve a formatted logging output in multi-cloud regions.

## Usage

This logger is applied by 3-step process.

1. Import the logger class.
1. Supply the necessary configuration to logger class
1. Use the logger methods available to push the logs to the server

For further configuration, two additional methods are provided:

1. mapLogLevels: This method allows you to duplicate the logs over other levels. This is useful in scenario where you may want all info logs or error logs to be printed to trace logs and debug logs.
1. setVerbose: This method allows you to print process id, gid, uid, memory usage from process instance

## Code Examples

1. Import the Logger class:

   ```typescript
   // Typescript
   import { Logger } from "ultralog";
   const logger = new Logger("aws");
   ```

   ```JavaScript
   // JavaScript
   const { Logger } = require("ultralog");
   const consoleLogger = new Logger("console");
   ```

1. Supply config (AWS Example):

   ```typescript
   logger.configure({
    accessKeyId: "accessKey",
    level: "trace",
    logGroup: "log-group",
    logStream: "log-stream",
    region: "aws-region",
    secretKey: "secret"
   });
   ```

1. Set Verbosity (optional):

   ```typescript
   logger.setVerbose(true);
   ```

1. Map the logging levels (optional):

   ```typescript
   logger.mapLogLevels({
      info: ["info", "debug", "trace"],
      debug: ["debug"],
      trace: ["trace"],
      error: ["error", "debug", "trace"]
   });
   ```

1. Use functions available => info/error/debug/trace

   ```typescript
   logger.info(
      "file-name/service/class",
      "function/method-name",
      "stringified message"
   );
   ```

The logger method takes first parameter as name of the file and class (if present), second parameter as function name, further parameters as message strings

## Contribution and Issues

Visit <https://github.com/ashubisht/ultralog> for more details \
Raise issues at <https://github.com/ashubisht/ultralog/issues> \
Read Contributions (updated soon) for code structure and development
