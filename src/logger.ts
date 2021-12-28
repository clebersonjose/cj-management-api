import winston from 'winston';

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
      level: 'warn',
      filename: 'logs/warn.log',
    }),

    new winston.transports.File({
      level: 'error',
      filename: 'logs/errors.log',
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

export default logger;
