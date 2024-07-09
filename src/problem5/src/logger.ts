import * as winston from 'winston';
import { format, transports } from 'winston';


const logFilePath = 'app.log';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(), 
    format.json() 
  ),
  transports: [
    new transports.File({ filename: logFilePath }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple() 
      ),
    }),
  ],
});
export default logger;