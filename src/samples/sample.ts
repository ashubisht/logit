import { Logger } from "./../index";

const consoleLogger = new Logger("console");
consoleLogger.configure({});
consoleLogger.info("sample", "no-function/global ctx", "This is a sample message");
consoleLogger.setVerbose(true);
consoleLogger.info("sample", "no-function/global ctx", "This is a sample message with verbose details");

const logger = new Logger("aws");
logger.configure({
    accessKeyId: "accessKey",
    level: "silly",
    logGroup: "logGroup",
    logStream: "logStream",
    region: "aws-region",
    secretKey: "secretKey"
})

logger.info("sample", "no-function/global ctx", "This is a sample message");

// Print with verbose details
logger.setVerbose(true);
logger.info("sample", "no-function/global ctx", "This is a sample message with verbose details");

console.log("Done");
/* Program doesnt quits here.
** Suspect that an event or callback is opened.
** This maybe from stream opened by logger but never closed.
** In my opinion, this is expected
*/