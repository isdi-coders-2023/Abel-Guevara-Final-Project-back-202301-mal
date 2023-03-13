import bunyan, { LogLevel } from 'bunyan';

const log = bunyan.createLogger({ name: 'Inked&Styled' });
log.level(process.env.BUNYAN_LEVEL as LogLevel);

export default log;
