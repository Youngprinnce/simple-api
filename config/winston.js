const appRoot = require("app-root-path");
const winston = require("winston");
require('winston-daily-rotate-file');

const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: "info",
            dirname: `${appRoot}/logs/`,
            filename: "application-%DATE%.log",
            handleExceptions: true,
            json: false,
            maxSize: "20m", 
            maxFiles: "14d",
            colorize: true,
            zippedArchive: true,
        }),
    ],
    exitOnError: false,
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message)
    }
}

module.exports = logger;