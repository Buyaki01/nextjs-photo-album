import { createLogger, transports, format } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(
      ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
        `${timestamp} [${label}] ${level}: ${message}`
    )
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }))
}

export default logger
  