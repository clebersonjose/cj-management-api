import winston from 'winston';

/**
 * @desc Configuration for winston logger.
 */

const logConfiguration = {
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/info.log',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
    }),

    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

export default logger;
