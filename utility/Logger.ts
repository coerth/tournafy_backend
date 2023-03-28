import * as log4js from "log4js"


log4js.configure({
    appenders: {
        out: {type: "stdout"},
        app: {type: "file", filename: "./app.log"}
    },
    categories: {
        default: {appenders: ["out", "app"], level: "debug"}
    }
})

export const logger = log4js.getLogger('default');

logger.debug('Some debug messages');
logger.info('Some info messages');
logger.warn('Some warning messages');
logger.error('Some error messages');
logger.fatal('Some fatal messages');

export default logger