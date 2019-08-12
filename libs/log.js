const { createLogger, transports, format } = require('winston');
const { combine, label, printf, colorize } = format;
const ENV = process.env.NODE_ENV;

function getLogger(module) {
  const path = module.filename.split('/').slice(-2).join('/');

  const myFormat = printf(({ level, message, label }) => {
      return `${level} [${label}]: ${message}`;
  });

  return createLogger({
      transports: [
          new transports.Console({
              format: combine(
                  label({ label: path }),
                  colorize(),
                  myFormat
              ),
          }),
      ],
  });

}

module.exports = getLogger;