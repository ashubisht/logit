# ultralog
Simple logging module for NodeJs. This is a wrapper module over the already established libraries to implement logger in simple 3-step code.

Currently development in progress and it is in beta.

This space will be updated soon

Quick update:

This logger is applied by 3-step process

1. import { Logger } from "./../index";
   const logger = Logger.getInstance();

2. Supply config (currently AWS supported)

   logger.configure({
    accessKeyId: "accessKey",
    level: "silly",
    logGroup: "log-group",
    logStream: "log-stream",
    region: "aws-region",
    secretKey: "secret"
   });

3. Set verbosity (optional, if needed). Verbosity prints additional message like process details and memory usage

4. Use functions available => logger.info/error/debug/trace

The function takes first parameter as fileName, second parameter as functionName, further parameters as string for message

Currently in beta. Bindings for GCP coming soon.